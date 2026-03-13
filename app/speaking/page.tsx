import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { talks, formatTalkDate } from '@/lib/talks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Talks - Alicia Martinelli",
  description: "Vorträge über AI, Agents und die Zukunft der Technologie. AI Horizons 2026: 'Willkommen im Agentic Web'. Machine Learning Grundlagen und AI Agent Systeme.",
  keywords: ["AI Talks", "Speaking", "AI Horizons", "Machine Learning", "AI Agents", "Vorträge", "Conference", "Speaker"],
  openGraph: {
    title: "Talks - Alicia Martinelli",
    description: "Vorträge über AI, Agents und die Zukunft der Technologie. AI Horizons 2026: 'Willkommen im Agentic Web'.",
    type: "website",
  },
};

export default function SpeakingPage() {
  const now = new Date();
  const upcomingTalks = talks
    .filter(talk => new Date(talk.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastTalks = talks
    .filter(talk => new Date(talk.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sections = [
    { title: 'Bevorstehende Talks', items: upcomingTalks },
    { title: 'Vergangene Talks', items: pastTalks }
  ].filter(section => section.items.length > 0);

  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-public-sans text-4xl font-semibold mb-6">
          <span className="gradient-text">Talks</span>
        </h1>
        <p className="text-lg text-am-ink/70 mb-4">
          Meine Vorträge über AI, Agents und die Zukunft der Technologie.
        </p>
        <p className="text-am-ink/60 mb-8">
          Als AI Explorer & Engineer teile ich meine Erfahrungen und Erkenntnisse aus der Praxis. 
          Von Machine Learning Grundlagen bis hin zu autonomen Agenten-Systemen.
        </p>

        {sections.map(section => (
          <div key={section.title} className="mb-12">
            <h2 className="font-public-sans text-2xl font-semibold mb-6">{section.title}</h2>
            <div className="space-y-8">
              {section.items.map(talk => {
                const talkDate = formatTalkDate(talk.date);
                const isUpcoming = new Date(talk.date) >= now;
                const badgeClass = isUpcoming ? 'bg-am-razz/10 text-am-razz' : 'bg-am-lilac/20 text-am-lilac';

                return (
                  <GlassCard key={talk.id} className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-public-sans text-3xl font-semibold mb-2">"{talk.title}"</h3>
                        <div className="flex flex-wrap items-center gap-2 text-am-ink/60 text-sm mb-4">
                          <span>{talk.event}</span>
                          <span>•</span>
                          <span>{talkDate}</span>
                          <span>•</span>
                          <span>{talk.location}</span>
                        </div>
                      </div>
                      <div className={`px-4 py-2 text-sm font-medium rounded-full ${badgeClass}`}>
                        {isUpcoming ? 'Upcoming' : 'Past'}
                      </div>
                    </div>

                    <p className="text-lg text-am-ink/70 mb-4">{talk.highlight}</p>
                    <p className="text-lg text-am-ink/80 mb-6">{talk.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      {talk.link && (
                        <a
                          href={talk.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button px-6 py-3 rounded-pill text-sm font-medium"
                        >
                          Event Stream
                        </a>
                      )}
                      {talk.slidesUrl && (
                        <a
                          href={talk.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button px-6 py-3 rounded-pill text-sm font-medium"
                        >
                          Slides ansehen / downloaden
                        </a>
                      )}
                    </div>

                    {talk.note && <p className="text-sm text-am-ink/60">{talk.note}</p>}
                  </GlassCard>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </PageTransition>
  );
}