'use client';
import { motion } from 'framer-motion';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <motion.button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${isSelected 
                ? 'bg-am-periwinkle text-am-ink shadow-md' 
                : 'bg-white/20 text-am-ink/70 hover:bg-white/30'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        );
      })}
    </div>
  );
}