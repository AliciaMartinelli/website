'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillBarProps {
  skill: string;
  level: number; // 0-100
  color: string;
  delay?: number;
  futureGoals?: {
    year: number;
    additionalLevel: number;
    color: string;
  }[];
  tooltip?: string;
}

export default function SkillBar({ skill, level, color, delay = 0, futureGoals = [], tooltip }: SkillBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const totalLevel = level + futureGoals.reduce((sum, goal) => sum + goal.additionalLevel, 0);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="relative">
          <span 
            className="text-sm font-medium text-am-ink cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {skill}
          </span>
          {tooltip && showTooltip && (
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-am-ink text-white text-xs rounded-lg shadow-lg z-50 max-w-xs">
              {tooltip}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-am-ink"></div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-am-ink/60">{level}%</span>
          {futureGoals.length > 0 && (
            <span className="text-xs text-am-ink/40">
              → {totalLevel}% ({futureGoals.map(g => `+${g.additionalLevel}% ${g.year}`).join(', ')})
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden relative">
        {/* Current level */}
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ 
            duration: 1.2, 
            delay: delay,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
        />
        
        {/* Future goals */}
        {futureGoals.map((goal, index) => {
          const previousGoalsWidth = futureGoals.slice(0, index).reduce((sum, g) => sum + g.additionalLevel, 0);
          const leftPosition = level + previousGoalsWidth;
          
          return (
            <motion.div
              key={goal.year}
              className={`h-full rounded-full ${goal.color} absolute top-0`}
              style={{ left: `${leftPosition}%` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${goal.additionalLevel}%` }}
              transition={{ 
                duration: 1.2, 
                delay: delay + 0.5 + (index * 0.2),
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            />
          );
        })}
      </div>
    </div>
  );
}
