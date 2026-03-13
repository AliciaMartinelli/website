'use client';
import { useState, useMemo } from 'react';
import PageTransition from '@/components/PageTransition';
import BlogPostCard from '@/components/BlogPostCard';
import { BlogPost } from '@/types/blog';

interface BlogClientProps {
  posts: BlogPost[];
}

// Lesezeit-Berechnung
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readTime);
}

// "New" Flag System
function isNewPost(dateString: string): boolean {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'readTime'>('newest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Alle verfügbaren Tags sammeln
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filter und Sortierung
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Suchfilter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tag-Filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Sortierung
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'readTime':
        filtered.sort((a, b) => calculateReadingTime(b.content) - calculateReadingTime(a.content));
        break;
    }

    return filtered;
  }, [posts, searchTerm, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-public-sans text-4xl font-semibold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-am-ink/70 mb-8">
            Gedanken, Tutorials und Erkenntnisse aus der Welt der AI und Web-Entwicklung.
          </p>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-am-ink/60 mb-4">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'} gefunden
          </p>
          
          {/* Tag Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-am-periwinkle text-white shadow-md'
                    : 'bg-white/20 text-am-ink/70 hover:bg-white/30 hover:text-am-ink'
                }`}
              >
                {tag}
              </button>
            ))}
            {(selectedTags.length > 0 || searchTerm) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 rounded-full text-sm font-medium bg-am-ink/10 text-am-ink/60 hover:bg-am-ink/20 transition-all duration-200"
              >
                Alle Filter zurücksetzen
              </button>
            )}
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts - nehmen volle Breite der Content-Spalte ein (1 Karte pro Zeile) */}
          <div className="lg:col-span-3 space-y-6">
            {filteredPosts.map((post, index) => {
              const isFeatured = sortBy === 'newest' && index === 0;
              const isNew = isNewPost(post.date);
              const readTime = calculateReadingTime(post.content);

              return (
                <BlogPostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  tags={post.tags}
                  readTime={readTime}
                  thumbnail={post.thumbnail || undefined}
                  isNew={isNew}
                  featured={isFeatured}
                />
              );
            })}
          </div>

          {/* Sidebar - 1/4 */}
          <aside className="space-y-6">
            {/* Search */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg">
              <h3 className="font-public-sans font-semibold text-lg mb-4">Suchen</h3>
              <input
                type="text"
                placeholder="Nach Posts suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg text-am-ink placeholder-am-ink/50 focus:outline-none focus:ring-2 focus:ring-am-periwinkle/50"
              />
            </div>

            {/* Sort */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg">
              <h3 className="font-public-sans font-semibold text-lg mb-4">Sortieren</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'readTime')}
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg text-am-ink focus:outline-none focus:ring-2 focus:ring-am-periwinkle/50"
              >
                <option value="newest">Neueste zuerst</option>
                <option value="oldest">Älteste zuerst</option>
                <option value="readTime">Längste Lesezeit</option>
              </select>
            </div>
          </aside>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-am-ink/60 mb-4">Keine Posts gefunden</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-am-periwinkle text-white rounded-lg hover:bg-am-periwinkle/90 transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
