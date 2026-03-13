import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';

export default function OpenSourcePage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-public-sans text-4xl font-semibold mb-6">
          <span className="gradient-text">Open Source</span>
        </h1>
        <p className="text-lg text-am-ink/70 mb-8">
          Meine Beiträge zur Open Source Community und öffentlich verfügbare Projekte.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h3 className="font-public-sans font-semibold text-lg mb-3">AI Tools</h3>
            <p className="text-sm text-am-ink/70 mb-4">
              Entwicklertools und Bibliotheken für die Arbeit mit KI-Modellen.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-am-periwinkle/20 text-am-ink text-xs rounded-full">Tools</span>
              <span className="px-3 py-1 bg-am-lilac/20 text-am-ink text-xs rounded-full">AI</span>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-public-sans font-semibold text-lg mb-3">Web Components</h3>
            <p className="text-sm text-am-ink/70 mb-4">
              Wiederverwendbare UI-Komponenten und Design-Systeme.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-am-apricot/20 text-am-ink text-xs rounded-full">UI</span>
              <span className="px-3 py-1 bg-am-razz/20 text-am-ink text-xs rounded-full">Components</span>
            </div>
          </GlassCard>
        </div>

        <div className="mt-12">
          <GlassCard className="text-center">
            <h2 className="font-public-sans text-2xl font-semibold mb-4">Beitragen</h2>
            <p className="text-am-ink/70 mb-6">
              Alle meine Projekte sind auf GitHub verfügbar. Feedback und Contributions sind willkommen!
            </p>
            <a href="https://github.com" className="glass-button px-6 py-3 rounded-pill text-sm font-medium">
              GitHub besuchen
            </a>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
