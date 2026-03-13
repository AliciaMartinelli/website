import { getAllPosts } from '@/lib/blog';
import BlogClient from './BlogClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog - Alicia Martinelli",
  description: "AI und Machine Learning Blog. Artikel über AI Agents, LLMs, Open Source Projekte und die Zukunft der Technologie. Regelmässige Updates zu AI-Experimenten.",
  keywords: ["AI Blog", "Machine Learning", "AI Agents", "LLM", "Open Source", "Blog", "AI Articles", "Technology"],
  openGraph: {
    title: "Blog - Alicia Martinelli",
    description: "AI und Machine Learning Blog. Artikel über AI Agents, LLMs und die Zukunft der Technologie.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogClient posts={posts} />;
}