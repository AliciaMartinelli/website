import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import { getUpcomingTalk, formatTalkDate } from '@/lib/talks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Alicia Martinelli - AI Explorer & Engineer",
  description: "AI Explorer & Engineer mit Leidenschaft für die Zukunft der Technologie. Experimente mit AI Agents, LLMs und autonomen Systemen. Community Building und Open Source Projekte.",
  keywords: ["AI", "Machine Learning", "AI Agents", "LLM", "Open Source", "Community", "Basel", "Switzerland"],
  openGraph: {
    title: "Alicia Martinelli - AI Explorer & Engineer",
    description: "AI Explorer & Engineer mit Leidenschaft für die Zukunft der Technologie.",
    type: "website",
  },
};

export default function Page() {
  const upcomingTalk = getUpcomingTalk();
  const talkCardText = upcomingTalk
    ? `Nächster Talk: "${upcomingTalk.title}" bei ${upcomingTalk.event} am ${formatTalkDate(upcomingTalk.date)}. ${upcomingTalk.homeSummary ?? ''}`
    : 'Gerade ist kein Talk geplant – hier findest du alle bisherigen Sessions, Slides und Recaps.';

  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-public-sans text-5xl font-semibold leading-tight">
          <span className="gradient-text">AI Explorer & Engineer</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[17px]">
          AI macht mich neugierig – täglich entdecke ich neue Möglichkeiten und experimentiere mit Tools, 
          die zeigen, wohin die Reise geht. Alles was ich lerne und baue, teile ich hier mit dir.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <GlassCard className="flex flex-col h-full border-am-razz/20">
            <h3 className="font-public-sans font-semibold text-lg">
              <span style={{background: 'linear-gradient(90deg, #C9C9EB, #E185C8, #DF0F51, #FFA161)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>pecto</span>
            </h3>
            <p className="mt-2 text-sm flex-grow">Mein Open Source CLI-Tool das Behavior Specs aus Code extrahiert. Unterstützt Java, C#, Python und TypeScript.</p>
            <div className="mt-3">
              <a href="https://pecto.dev" target="_blank" rel="noopener noreferrer" className="text-am-razz text-sm font-medium hover:underline">pecto.dev →</a>
            </div>
          </GlassCard>
          <GlassCard className="flex flex-col h-full">
            <h3 className="font-public-sans font-semibold text-lg">AI Lab</h3>
            <p className="mt-2 text-sm flex-grow">Experimente mit Agenten, LLMs und autonomen Systemen. Alle Projekte und Erkenntnisse dokumentiere ich öffentlich auf GitHub.</p>
            <div className="mt-3">
              <a href="/ai-lab" className="text-am-razz text-sm font-medium hover:underline">Projekte ansehen →</a>
            </div>
          </GlassCard>
          <GlassCard className="flex flex-col h-full">
            <h3 className="font-public-sans font-semibold text-lg">Community</h3>
            <p className="mt-2 text-sm flex-grow">Beim AI-Stammtisch Basel treffen wir uns regelmässig zum Austausch. Open Source Projekte und gemeinsames Lernen stehen im Fokus.</p>
            <div className="mt-3">
              <a href="/community" className="text-am-razz text-sm font-medium hover:underline">Mitmachen →</a>
            </div>
          </GlassCard>
          <GlassCard className="flex flex-col h-full">
            <h3 className="font-public-sans font-semibold text-lg">Talks</h3>
            <p className="mt-2 text-sm flex-grow">{talkCardText}</p>
            <div className="mt-3">
              <a href="/speaking" className="text-am-razz text-sm font-medium hover:underline">Mehr erfahren →</a>
            </div>
          </GlassCard>
        </div>

        <div className="mt-16">
          <InteractiveTimeline />
        </div>
      </section>
    </PageTransition>
  );
}
