import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';

export default function StammtischPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-public-sans text-4xl font-semibold mb-6">
          <span className="gradient-text">AI-Stammtisch Basel</span>
        </h1>
        <p className="text-lg text-am-ink/70 mb-8">
          Community Basel: Themen, Recaps, Ressourcen.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h3 className="font-public-sans font-semibold text-lg mb-3">Nächste Termine</h3>
            <p className="text-sm text-am-ink/70 mb-4">
              Regelmässige Treffen jeden ersten Dienstag im Monat um 19:00 Uhr.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-am-periwinkle/20 text-am-ink text-xs rounded-full">Community</span>
              <span className="px-3 py-1 bg-am-lilac/20 text-am-ink text-xs rounded-full">Basel</span>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-public-sans font-semibold text-lg mb-3">Themen</h3>
            <p className="text-sm text-am-ink/70 mb-4">
              Von Large Language Models bis hin zu praktischen Anwendungen in der Industrie.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-am-apricot/20 text-am-ink text-xs rounded-full">LLMs</span>
              <span className="px-3 py-1 bg-am-razz/20 text-am-ink text-xs rounded-full">Industry</span>
            </div>
          </GlassCard>
        </div>

        <div className="mt-12">
          <GlassCard className="text-center">
            <h2 className="font-public-sans text-2xl font-semibold mb-4">Mitmachen</h2>
            <p className="text-am-ink/70 mb-6">
              Interesse an der AI-Community in Basel? Komm vorbei und tausche dich mit anderen AI-Enthusiasten aus.
            </p>
            <a href="/contact" className="glass-button px-6 py-3 rounded-pill text-sm font-medium">
              Kontakt aufnehmen
            </a>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
