import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kontakt - Alicia Martinelli",
  description: "Kontakt zu Alicia Martinelli - AI Explorer & Engineer. GitHub, LinkedIn, AI-Stammtisch Basel und E-Mail. Lass uns vernetzen und über AI, Technologie und Zusammenarbeit sprechen.",
  keywords: ["Kontakt", "Contact", "GitHub", "LinkedIn", "AI-Stammtisch", "Meetup", "E-Mail", "Networking", "Collaboration"],
  openGraph: {
    title: "Kontakt - Alicia Martinelli",
    description: "Kontakt zu Alicia Martinelli - AI Explorer & Engineer. Lass uns vernetzen und über AI sprechen.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="font-public-sans text-4xl font-semibold mb-6">
            <span className="gradient-text">Kontakt</span>
          </h1>
          <p className="text-lg text-am-ink/70 mb-8">
            Lass uns vernetzen!
          </p>
        </div>

        {/* Social Media Box - Mittig positioniert */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-6 text-center">Social Media</h2>
              <div className="grid gap-4">
                <a 
                  href="https://github.com/AliciaMartinelli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-am-periwinkle/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-am-periwinkle" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-am-ink">GitHub</h3>
                    <p className="text-sm text-am-ink/70">@AliciaMartinelli</p>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/alicia-martinelli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-am-lilac/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-am-lilac" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-am-ink">LinkedIn</h3>
                    <p className="text-sm text-am-ink/70">Alicia Martinelli</p>
                  </div>
                </a>

                <a 
                  href="https://www.meetup.com/basel-ai-stammtisch/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-am-apricot/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-am-apricot" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-am-ink">AI-Stammtisch Basel</h3>
                    <p className="text-sm text-am-ink/70">Meetup Community</p>
                  </div>
                </a>

                <a 
                  href="mailto:contact@alicia-martinelli.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-am-razz/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-am-razz" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-am-ink">E-Mail</h3>
                    <p className="text-sm text-am-ink/70">contact@alicia-martinelli.com</p>
                  </div>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}