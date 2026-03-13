import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName =>
      fileName.endsWith('.mdx') &&
      fileName !== 'template.mdx' &&
      !['getting-started-ai-agents.mdx', 'future-web-development.mdx'].includes(fileName)
    )
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        content: content
      };
    });
  
  return allPostsData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    content: content
  };
}

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName =>
      fileName.endsWith('.mdx') &&
      fileName !== 'template.mdx' &&
      !['getting-started-ai-agents.mdx', 'future-web-development.mdx'].includes(fileName)
    )
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}
