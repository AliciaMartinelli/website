'use client';

import { useState } from 'react';

interface SkillGroup {
  title: string;
  chipClass: string;
  skills: string[];
}

const fullStackGroups: SkillGroup[] = [
  {
    title: 'Frontend & UI',
    chipClass: 'bg-am-lilac/10',
    skills: ['React.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Bootstrap']
  },
  {
    title: 'Backend & APIs',
    chipClass: 'bg-am-periwinkle/10',
    skills: ['Node.js', 'Python', 'Java', 'C#', 'Spring Boot', '.NET', 'REST']
  },
  {
    title: 'Data & Infrastructure',
    chipClass: 'bg-am-apricot/10',
    skills: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL', 'Docker', 'Kubernetes', 'Apache Superset', 'Node-RED']
  },
  {
    title: 'Collaboration & Delivery',
    chipClass: 'bg-am-rose/10',
    skills: ['Git', 'GitHub', 'GitLab', 'GitLab CI/CD', 'GitHub Actions', 'Jenkins', 'Jira', 'Confluence', 'Scrum', 'Kanban']
  },
  {
    title: 'Quality & Tooling',
    chipClass: 'bg-am-slate/10',
    skills: ['JUnit', 'JMock', 'Maven', 'Gradle', 'TSFresh', 'IntelliJ IDEA', 'JBoss', 'Matlab', 'Origins']
  }
];

export default function FullStackSkills() {
  const [activeGroup, setActiveGroup] = useState<string>(fullStackGroups[0].title);
  const activeGroupData = fullStackGroups.find(group => group.title === activeGroup) ?? fullStackGroups[0];

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        {fullStackGroups.map(group => (
          <button
            key={group.title}
            onClick={() => setActiveGroup(group.title)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              activeGroup === group.title ? 'bg-am-lilac text-am-ink' : 'bg-white/10 text-am-ink/60 hover:bg-white/20'
            }`}
          >
            {group.title}
          </button>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
        </div>
        <div className="grid grid-cols-2 gap-3">
          {activeGroupData.skills.map(skill => (
            <div key={skill} className={`text-center p-3 rounded-lg border border-white/5 ${activeGroupData.chipClass}`}>
              <div className="text-xs font-medium">{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

