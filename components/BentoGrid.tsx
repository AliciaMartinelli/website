'use client';
import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2 | 3;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
}

export function BentoItem({ 
  children, 
  className = '', 
  colSpan = 1, 
  rowSpan = 1 
}: BentoItemProps) {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3'
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2', 
    3: 'row-span-3'
  };

  return (
    <div className={`
      ${spanClasses[colSpan]} 
      ${rowSpanClasses[rowSpan]}
      ${className}
    `}>
      {children}
    </div>
  );
}
