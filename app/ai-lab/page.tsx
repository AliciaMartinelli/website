import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { experiments } from '@/lib/experiments';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Lab - Alicia Martinelli",
  description: "Experimente mit AI Agents, LLMs und autonomen Systemen. Alle Projekte sind öffentlich dokumentiert und auf GitHub verfügbar. Agentic Ecosystem Drift, Cognitive Fusion Layer und mehr.",
  keywords: ["AI Lab", "AI Agents", "LLM", "Machine Learning", "Experiments", "GitHub", "Open Source", "AI Research"],
  openGraph: {
    title: "AI Lab - Alicia Martinelli",
    description: "Experimente mit AI Agents, LLMs und autonomen Systemen. Alle Projekte öffentlich dokumentiert.",
    type: "website",
  },
};

export default function AILabPage() {
  const statusStyles: Record<string, string> = {
    Abgeschlossen: 'bg-emerald-200/40 text-emerald-700',
    'In Planung': 'bg-am-apricot/20 text-am-apricot',
    'In Arbeit': 'bg-am-periwinkle/20 text-am-periwinkle'
  };

  // Sortiere Experimente: Zukünftige zuerst, dann nach Datum absteigend (neueste zuerst)
  const sortedExperiments = [...experiments].sort((a, b) => {
    const parseDate = (dateStr: string): Date => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-11
      
      // Handle "Q1 2026", "Q2 2026", etc.
      if (dateStr.startsWith('Q')) {
        const [quarter, year] = dateStr.split(' ');
        const quarterNum = parseInt(quarter.substring(1));
        const yearNum = parseInt(year);
        // Q1 = Jan (0), Q2 = Apr (3), Q3 = Jul (6), Q4 = Oct (9)
        const month = (quarterNum - 1) * 3;
        return new Date(yearNum, month, 1);
      }
      
      // Handle "Nov 2025", "Dez 2025", etc.
      const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      const parts = dateStr.split(' ');
      const monthName = parts[0];
      const year = parseInt(parts[1]);
      const month = monthNames.indexOf(monthName);
      
      return new Date(year, month, 1);
    };

    const dateA = parseDate(a.startDate);
    const dateB = parseDate(b.startDate);
    const now = new Date();
    
    const isFutureA = dateA > now;
    const isFutureB = dateB > now;
    
    // Zukünftige zuerst
    if (isFutureA && !isFutureB) return -1;
    if (!isFutureA && isFutureB) return 1;
    
    // Dann nach Datum absteigend (neueste zuerst)
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="font-public-sans text-4xl font-semibold mb-4">
            <span className="gradient-text">AI Lab</span>
          </h1>
          <p className="text-lg text-am-ink/70 mb-6">
            Meine Experimente, Prototypen und Evaluationen. Alle Projekte sind öffentlich dokumentiert und auf GitHub verfügbar.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/AliciaMartinelli/ai-lab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-button px-6 py-3 rounded-pill text-sm font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedExperiments.map((experiment, index) => (
            <GlassCard key={index} className="flex flex-col h-full">
              <h3 className="font-public-sans font-semibold text-lg mb-3">{experiment.title}</h3>
              <p className="text-sm text-am-ink/70 mb-4 flex-grow">
                {experiment.description}
              </p>
              <div className="mt-auto">
                <div className="flex gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-am-ink/60">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full font-medium ${statusStyles[experiment.status] ?? 'bg-am-apricot/20 text-am-apricot'}`}
                    >
                      {experiment.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-am-ink/60">Start:</span>
                    <span className="text-am-ink/80">{experiment.startDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`/ai-lab/${experiment.slug}`} className="text-am-razz text-sm font-medium hover:underline">Mehr erfahren →</a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </section>
    </PageTransition>
  );
}
