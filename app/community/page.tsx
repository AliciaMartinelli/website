import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Metadata } from 'next';
import NextStammtischDate from './NextStammtischDate';

export const metadata: Metadata = {
  title: "Community - Alicia Martinelli",
  description: "AI-Stammtisch Basel - Regelmässige Treffen der AI-Community. Open Source Projekte und gemeinsames Lernen. Organisiert von Yannic Lais und Alicia Martinelli.",
  keywords: ["AI Community", "Basel", "AI-Stammtisch", "Meetup", "Open Source", "Community", "AI Events", "Switzerland"],
  openGraph: {
    title: "Community - Alicia Martinelli",
    description: "AI-Stammtisch Basel - Regelmässige Treffen der AI-Community. Open Source Projekte und gemeinsames Lernen.",
    type: "website",
  },
};

export default function CommunityPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-public-sans text-4xl font-semibold mb-6">
          <span className="gradient-text">Community</span>
        </h1>
        <p className="text-lg text-am-ink/70 mb-8">
          Meine Community-Aktivitäten, Open Source Projekte und der AI-Stammtisch Basel.
        </p>

        {/* AI-Stammtisch Basel */}
        <div className="mb-12">
          <GlassCard className="p-8">
            <div className="mb-6">
              <h2 className="font-public-sans text-2xl font-semibold mb-2">AI-Stammtisch Basel</h2>
              <p className="text-am-ink/70 mb-6">
                Regelmässige Treffen der AI-Community in Basel. Organisiert von Yannic Lais und mir. Gesponsert durch iRIX Software Engineering AG. Immer am letzten Donnerstag im Monat.
              </p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="font-public-sans font-semibold text-lg mb-3">Was ist der AI-Stammtisch?</h3>
                  <p className="text-sm text-am-ink/70 mb-4">
                    Ein offenes Format für alle, die sich für AI interessieren - von Anfängern bis zu Experten. 
                    Wir diskutieren aktuelle Entwicklungen, teilen Erfahrungen und lernen voneinander.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <div className="w-full max-w-xs rounded-2xl bg-gradient-to-b from-[#5865F2] via-[#4C56D3] to-[#232347] text-white shadow-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Image src="/Discord-Symbol-Blurple.svg" alt="Discord Logo" width={32} height={32} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/70">Discord Server</p>
                        <p className="text-lg font-semibold leading-tight">AI-Stammtisch Basel</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-4">
                      Tritt dem AI-Stammtisch Discord bei, tausche dich mit der Community aus.
                    </p>
                    <a
                      href="https://discord.gg/cyVWNwEd2t"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/90 text-[#2B2B90] font-semibold text-sm shadow-md hover:bg-white transition-colors"
                    >
                      <span>Beitreten</span>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L14 6.414V17a1 1 0 11-2 0V6.414l-2.293 2.293A1 1 0 018.293 7.293l4-4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-public-sans font-semibold text-lg mb-3">Nächstes Event</h3>
                  <NextStammtischDate />
                  <p className="text-sm text-am-ink/70">
                    Wir würden uns freuen, wenn du dabei bist! Folge uns auf Meetup für Updates zu kommenden Events und Themen.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <a 
                    href="https://www.meetup.com/basel-ai-stammtisch/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button px-6 py-3 rounded-pill text-sm font-medium"
                  >
                    Über Meetup anmelden
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Open Source Contributions */}
        <div className="mb-12">
          <h2 className="font-public-sans text-2xl font-semibold mb-6">Open Source Contributions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard>
              <h3 className="font-public-sans font-semibold text-lg mb-3">AI Lab Repository</h3>
              <p className="text-sm text-am-ink/70 mb-4">
                Meine Experimente, Prototypen und Evaluationen. Alle Projekte sind öffentlich dokumentiert und zur Zusammenarbeit offen.
              </p>
              <a 
                href="https://github.com/AliciaMartinelli/ai-lab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-am-razz text-sm font-medium hover:underline"
              >
                GitHub Repository →
              </a>
            </GlassCard>

            <GlassCard>
              <h3 className="font-public-sans font-semibold text-lg mb-3">Open Source Collaboration</h3>
              <p className="text-sm text-am-ink/70 mb-4">
                Hast du eine tolle Idee für ein Open Source Projekt und brauchst noch Unterstützung? Ich freue mich auf spannende Zusammenarbeit!
              </p>
              <a href="/contact" className="text-am-razz text-sm font-medium hover:underline">
                Zusammenarbeiten →
              </a>
            </GlassCard>
          </div>
        </div>

      </section>
    </PageTransition>
  );
}
