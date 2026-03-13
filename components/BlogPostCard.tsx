'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from './GlassCard';

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
  slug: string;
  thumbnail?: string;
  isNew?: boolean;
  featured?: boolean;
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  tags,
  readTime,
  slug,
  thumbnail,
  isNew = false,
  featured = false
}: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/blog/${slug}`}>
        <GlassCard className={`h-full p-6 hover:shadow-lg transition-all duration-300 hover:bg-white/90 flex flex-col ${featured ? 'p-8' : ''}`}>
          {/* New Badge */}
          {isNew && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-am-razz/20 text-am-razz">
                New
              </span>
            </div>
          )}

          {thumbnail && (
            <div className={`mb-4 aspect-video bg-am-periwinkle/10 rounded-lg overflow-hidden ${featured ? 'mb-6' : ''}`}>
              <img 
                src={thumbnail} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center gap-2 text-xs text-am-ink/60 mb-3">
            <span>{formatDate(date)}</span>
            <span>•</span>
            <span>{readTime} min Lesezeit</span>
          </div>
          
          <h3 className={`font-public-sans font-semibold mb-3 line-clamp-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {title}
          </h3>
          
          <p className={`text-am-ink/70 mb-4 flex-grow ${featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}>
            {excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-am-periwinkle/20 text-am-ink text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-am-ink/10 text-am-ink/60 text-xs rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}