'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  date?: string;
  year?: number;
  month?: number;
  period: 'past' | 'present' | 'future';
  color: string;
}

const milestones: Milestone[] = [
  {
    id: 'supervised-learning',
    title: 'Supervised Learning',
    description: 'Erste ML-Erfahrungen',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    date: 'Nov 2024',
    year: 2024,
    month: 11,
    period: 'past',
    color: 'bg-am-periwinkle/20'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'CNN & Computer Vision',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    date: 'Dez 2024',
    year: 2024,
    month: 12,
    period: 'past',
    color: 'bg-am-apricot/20'
  },
  {
    id: 'developer-meeting-talk',
    title: 'Machine Learning I - Developer Meeting Talk',
    description: 'Erster Vortrag über Machine Learning bei iRIX Software Engineering AG',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"/>
        <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5a.75.75 0 001.5 0v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 11-9 0v-.357z"/>
      </svg>
    ),
    link: '/speaking',
    date: '18. Nov 2024',
    year: 2024,
    month: 11,
    period: 'past',
    color: 'bg-am-lilac/20'
  },
  {
    id: 'advanced-ml',
    title: 'Advanced ML',
    description: 'Model Training',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    ),
    date: 'Mär 2025',
    year: 2025,
    month: 3,
    period: 'past',
    color: 'bg-am-lilac/20'
  },
  {
    id: 'n8n-workflow',
    title: 'n8n Workflow',
    description: 'Kalender & Planung',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
    ),
    date: 'Jun 2025',
    year: 2025,
    month: 6,
    period: 'past',
    color: 'bg-am-apricot/20'
  },
  {
    id: 'ai-stammtisch',
    title: 'Erster AI-Stammtisch',
    description: 'Community Basel',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
      </svg>
    ),
    link: '/community',
    date: 'Sep 2025',
    year: 2025,
    month: 9,
    period: 'past',
    color: 'bg-am-lilac/20'
  },
  {
    id: 'llm-context-interference',
    title: 'LLM Context Interference Mapping',
    description: 'Multi-Model Context Interference Analysis',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd"/>
      </svg>
    ),
    link: '/ai-lab/llm-context-interference',
    date: 'Nov 2025',
    year: 2025,
    month: 11,
    period: 'past',
    color: 'bg-am-periwinkle/20'
  },
  {
    id: 'model-priors-average-world',
    title: 'Model Priors & Average World',
    description: 'Kulturelle Defaults in LLMs',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
      </svg>
    ),
    link: '/ai-lab/llm-default-world',
    date: 'Dez 2025',
    year: 2025,
    month: 12,
    period: 'past',
    color: 'bg-am-razz/20'
  },
  {
    id: 'ai-horizons-2026',
    title: 'AI Horizons 2026',
    description: 'Speaker Engagement',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"/>
        <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5a.75.75 0 001.5 0v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 11-9 0v-.357z"/>
      </svg>
    ),
    link: '/speaking',
    date: 'Nov 2025',
    year: 2025,
    month: 11,
    period: 'past',
    color: 'bg-am-razz/20'
  },
  {
    id: 'dream-synthesis-simulation',
    title: 'Dream-Synthesis Simulation',
    description: 'Text-Image Iteration',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd"/>
      </svg>
    ),
    link: '/ai-lab/dream-synthesis-simulation',
    date: 'Mai 2026',
    year: 2026,
    month: 5,
    period: 'future',
    color: 'bg-am-apricot/20'
  },
];

export default function InteractiveTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Sort milestones by year and month
  const sortedMilestones = [...milestones].sort((a, b) => {
    if (a.year !== b.year) return a.year! - b.year!;
    return a.month! - b.month!;
  });

  // Track which years we've already shown
  const shownYears = new Set<number>();

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Check scroll position on mount and scroll
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-public-sans text-3xl font-semibold mb-4">
          <span className="gradient-text">Meine AI-Milestones</span>
        </h2>
        <p className="text-am-ink/70">
          Von den ersten Schritten bis heute.
        </p>
      </div>

      {/* Horizontal Timeline */}
      <div className="relative">
        {/* Scroll Arrows */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full p-2 shadow-lg hover:bg-white/90 transition-all duration-200"
            aria-label="Nach links scrollen"
          >
            <svg className="w-5 h-5 text-am-ink" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full p-2 shadow-lg hover:bg-white/90 transition-all duration-200"
            aria-label="Nach rechts scrollen"
          >
            <svg className="w-5 h-5 text-am-ink" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        )}

        {/* Milestones */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
        >
          {sortedMilestones.map((milestone, index) => {
            // Check if this is the first occurrence of this year
            const isFirstOfYear = milestone.year && !shownYears.has(milestone.year);
            if (milestone.year) shownYears.add(milestone.year);

            const content = (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer flex-shrink-0"
              >
                {/* Date above timeline - only show for first occurrence of each year */}
                {isFirstOfYear && milestone.year && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-am-ink/70 font-medium">
                    {milestone.year}
                  </div>
                )}
                
                {/* Timeline Dot */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-am-bg shadow-lg z-10"></div>
                
                {/* Milestone Card */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-lg mt-8"
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 ${milestone.color} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                    {milestone.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-public-sans font-semibold text-sm mb-1 text-center">{milestone.title}</h3>
                  <p className="text-xs text-am-ink/70 text-center">{milestone.description}</p>
                </motion.div>
              </motion.div>
            );

            return milestone.link ? (
              <Link key={milestone.id} href={milestone.link}>
                {content}
              </Link>
            ) : (
              <div key={milestone.id}>
                {content}
              </div>
            );
          })}
        </div>
        
        {/* Timeline Line - positioned to go through the dots */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-am-periwinkle/50 via-am-lilac/50 to-am-razz/50 rounded-full"></div>
      </div>
    </div>
  );
}
