import { ReactNode } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  projectLink?: string;
  children?: ReactNode;
  className?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  githubLink, 
  projectLink, 
  children,
  className = '' 
}: ProjectCardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl2 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}>
      <h3 className="font-public-sans font-semibold text-lg mb-3">{title}</h3>
      <p className="text-sm text-am-ink/70 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-am-periwinkle/20 text-am-ink text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {children}
      
      <div className="flex gap-2 mt-4">
        {projectLink && (
          <a 
            href={projectLink} 
            className="text-am-razz text-sm font-medium hover:underline"
          >
            Mehr erfahren →
          </a>
        )}
        {githubLink && (
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-am-ink/60 text-sm hover:underline"
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  );
}
