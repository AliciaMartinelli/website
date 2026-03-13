import { ReactNode } from 'react';

export default function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl2 p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
