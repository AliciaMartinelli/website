'use client';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  color: string;
}

interface TimelineVerticalProps {
  items: TimelineItem[];
}

export default function TimelineVertical({ items }: TimelineVerticalProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-am-periwinkle via-am-lilac to-am-apricot"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative flex items-start gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <GlassCard className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-public-sans font-semibold text-lg text-am-ink">
                    {item.title}
                  </h3>
                  <span className="text-sm text-am-ink/60 font-medium">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-am-ink/70 leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
