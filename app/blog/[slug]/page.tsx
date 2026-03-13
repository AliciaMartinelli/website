import { notFound } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import SocialLinks from '@/components/SocialLinks';
import CodeBlock from '@/components/CodeBlock';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';

// Lesezeit-Berechnung
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readTime);
}

// Content-Rendering mit Syntax-Highlighting
function renderContent(content: string) {
  // Code-Blöcke mit Sprache extrahieren
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Text vor dem Code-Block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      parts.push({ type: 'text', content: textContent });
    }

    // Code-Block
    const language = match[1] || 'text';
    const code = match[2];
    parts.push({ type: 'code', language, code });

    lastIndex = match.index + match[0].length;
  }

  // Restlicher Text nach dem letzten Code-Block
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex);
    parts.push({ type: 'text', content: textContent });
  }

  return parts;
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// Bullet Points zu Listen konvertieren
function processBulletPoints(html: string): string {
  // Erkenne aufeinanderfolgende <li> Elemente und wrappe sie in <ul>
  // Berücksichtige auch Listen, die in <p> Tags eingewickelt sind
  html = html.replace(/<p class="mb-4">(<li class="mb-1">.*?<\/li>(\s*<li class="mb-1">.*?<\/li>)*)<\/p>/g, '<ul class="mb-4 ml-6 list-disc space-y-1">$1</ul>');
  // Erkenne Listen, die nicht in <p> Tags sind
  html = html.replace(/(<li class="mb-1">.*?<\/li>(\s*<li class="mb-1">.*?<\/li>)*)/g, (match) => {
    // Prüfe ob bereits in <ul> eingewickelt
    if (!match.includes('<ul')) {
      return `<ul class="mb-4 ml-6 list-disc space-y-1">${match}</ul>`;
    }
    return match;
  });
  return html;
}

// Bilder verarbeiten (sowohl Markdown-Syntax als auch HTML)
function processImages(html: string): string {
  // Markdown-Bild-Syntax: ![alt](src)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-6"><img src="$2" alt="$1" class="w-full h-auto rounded-xl border border-white/10" /></figure>');
  
  // HTML <figure> Tags mit korrekten Klassen versehen, falls noch nicht vorhanden
  html = html.replace(/<figure([^>]*)>/g, (match, attrs) => {
    if (attrs && attrs.includes('class=')) {
      return match;
    }
    return '<figure class="my-6"' + (attrs || '') + '>';
  });
  
  // <img> Tags mit korrekten Klassen versehen
  html = html.replace(/<img\s+([^>]*?)>/g, (match, attrs) => {
    // Prüfe ob class bereits vorhanden
    if (attrs.includes('class=')) {
      // Erweitere bestehende class, falls w-full noch nicht vorhanden
      if (!attrs.includes('w-full')) {
        return match.replace(/class="([^"]*)"/, 'class="$1 w-full h-auto rounded-xl border border-white/10"');
      }
      return match;
    } else {
      // Füge class hinzu
      return `<img ${attrs} class="w-full h-auto rounded-xl border border-white/10">`;
    }
  });
  
  // <figcaption> Tags mit korrekten Klassen versehen
  html = html.replace(/<figcaption([^>]*)>/g, (match, attrs) => {
    if (attrs && attrs.includes('class=')) {
      return match;
    }
    return '<figcaption class="text-sm text-am-ink/60 mt-2 text-center"' + (attrs || '') + '>';
  });
  
  return html;
}

// Generiere IDs für Überschriften
function generateHeadingIds(content: string): string {
  return content
    .replace(/^# (.*$)/gim, (match, title) => {
      const id = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      return `<h1 id="${id}" class="font-public-sans text-3xl font-semibold mb-4 mt-8">${title}</h1>`;
    })
    .replace(/^## (.*$)/gim, (match, title) => {
      const id = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      return `<h2 id="${id}" class="font-public-sans text-2xl font-semibold mb-3 mt-8">${title}</h2>`;
    })
    .replace(/^### (.*$)/gim, (match, title) => {
      const id = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      return `<h3 id="${id}" class="font-public-sans text-xl font-semibold mb-2 mt-8">${title}</h3>`;
    })
    .replace(/^#### (.*$)/gim, (match, title) => {
      const id = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      return `<h4 id="${id}" class="font-public-sans text-lg font-semibold mb-2 mt-6">${title}</h4>`;
    });
}

// Extrahiere Überschriften für TOC
function extractHeadings(content: string): Array<{id: string, title: string, level: number}> {
  const headings: Array<{id: string, title: string, level: number}> = [];
  const lines = content.split('\n');
  let inCodeBlock = false; // Verfolgt, ob wir uns in einem Code-Block befinden
  
  lines.forEach(line => {
    // Umschalten des inCodeBlock-Status, wenn ein Code-Block-Delimiter gefunden wird
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return; // Diese Zeile nicht als Überschrift verarbeiten
    }
    
    if (!inCodeBlock) { // Nur Überschriften verarbeiten, wenn nicht in einem Code-Block
      const h1Match = line.match(/^# (.*)$/);
      const h2Match = line.match(/^## (.*)$/);
      const h3Match = line.match(/^### (.*)$/);
      const h4Match = line.match(/^#### (.*)$/);
      
      if (h1Match) {
        const title = h1Match[1];
        const id = title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .trim();
        headings.push({ id, title, level: 1 });
      } else if (h2Match) {
        const title = h2Match[1];
        const id = title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .trim();
        headings.push({ id, title, level: 2 });
      } else if (h3Match) {
        const title = h3Match[1];
        const id = title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .trim();
        headings.push({ id, title, level: 3 });
      } else if (h4Match) {
        const title = h4Match[1];
        const id = title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .trim();
        headings.push({ id, title, level: 4 });
      }
    }
  });
  
  return headings;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Extrahiere Überschriften für TOC
  const headings = extractHeadings(post.content);

  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <GlassCard className="p-6 sm:p-8 lg:p-10">
          <article>
            {/* Hero */}
            <header className="mb-10 lg:mb-12">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-am-ink/60 mb-4">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{calculateReadingTime(post.content)} Min. Lesezeit</span>
                </div>
                
                <h1 className="font-public-sans text-3xl sm:text-4xl font-semibold mb-4">
                  <span className="gradient-text">{post.title}</span>
                </h1>
                
                <p className="text-lg text-am-ink/70 mb-6">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-am-lilac/20 text-am-ink text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-4">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <div className="text-am-ink/80 leading-relaxed">
                    {renderContent(post.content).map((part, index) => {
                      if (part.type === 'code') {
                        return (
                          <CodeBlock
                            key={index}
                            code={part.code || ''}
                            language={part.language || 'text'}
                          />
                        );
                      } else {
                        // HTML-Tags temporär markieren, damit sie nicht von Text-Konvertierung betroffen sind
                        const htmlPlaceholders: { [key: string]: string } = {};
                        let placeholderIndex = 0;
                        let content = part.content || '';
                        
                        // Erkenne und ersetze HTML-Tags (figure, img, figcaption) mit Platzhaltern
                        content = content.replace(/<figure[\s\S]*?<\/figure>/gi, (match) => {
                          const placeholder = `__HTML_PLACEHOLDER_${placeholderIndex}__`;
                          htmlPlaceholders[placeholder] = match;
                          placeholderIndex++;
                          return placeholder;
                        });
                        
                        // Text zu HTML konvertieren
                        let htmlContent = generateHeadingIds(content)
                          .replace(/^\- (.*$)/gim, '<li class="mb-1">$1</li>')
                          .replace(/^\* (.*$)/gim, '<li class="mb-1">$1</li>')
                          .replace(/`([^`]+)`/gim, '<code class="bg-am-periwinkle/20 px-2 py-1 rounded text-sm">$1</code>')
                          .replace(/\n\n/gim, '</p><p class="mb-4">')
                          // Überspringe Zeilen, die bereits HTML-Tags haben oder Listen sind
                          .replace(/^(?!<[h|l|p|d|s|u]|__HTML_PLACEHOLDER_|\s*[-*] )/gim, '<p class="mb-4">');
                        
                        // HTML-Tags wieder einfügen
                        Object.keys(htmlPlaceholders).forEach(placeholder => {
                          htmlContent = htmlContent.replace(placeholder, htmlPlaceholders[placeholder]);
                        });
                        
                        return (
                          <div
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: processImages(
                                processBulletPoints(htmlContent)
                              )
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Table of Contents */}
                <GlassCard className="p-6">
                  <h3 className="font-public-sans font-semibold text-lg mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-am-periwinkle" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    Inhaltsverzeichnis
                  </h3>
                  <nav className="space-y-1">
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block px-3 rounded-lg text-sm transition-all duration-200 ${
                          heading.level === 1
                            ? 'py-2 font-medium text-am-ink hover:bg-am-periwinkle/10 hover:text-am-periwinkle border-l-2 border-transparent hover:border-am-periwinkle'
                            : heading.level === 2
                            ? 'py-1.5 ml-4 text-am-ink/80 hover:bg-am-lilac/10 hover:text-am-lilac'
                            : heading.level === 3
                            ? 'py-1 ml-8 text-am-ink/70 hover:bg-am-apricot/10 hover:text-am-apricot'
                            : 'py-1 ml-12 text-am-ink/60 hover:bg-am-rose/10 hover:text-am-rose'
                        }`}
                      >
                        {heading.title}
                      </a>
                    ))}
                  </nav>
                </GlassCard>
              </div>
            </div>
          </article>
        </GlassCard>
      </section>
    </PageTransition>
  );
}