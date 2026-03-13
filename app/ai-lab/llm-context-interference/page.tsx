import { ReactNode } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';
import { InlineMath } from 'react-katex';

import compareModelsKl from './media/compare_models_KL_lin.png';
import compareModelsL2 from './media/compare_models_L2_lin.png';
import summaryL2Mistral from './media/summary_L2_lin_mistral7b.png';
import summaryL2Phi3 from './media/summary_L2_lin_phi3_mini.png';
import summaryL2Qwen2 from './media/summary_L2_lin_qwen2_7b.png';

interface ExperimentContent {
  title: string;
  description: string;
  status: string;
  statusColor: string;
  startDate: string;
  motivation: ReactNode;
  context: ReactNode;
  setup: ReactNode;
  hypotheses: ReactNode[];
  methodology: ReactNode;
  challenges: ReactNode[];
  nextSteps: ReactNode[];
  technologies: string[];
  keyConcepts: string[];
  relatedExperiments: string[];
  githubLink: string;
  demoLink: string | null;
  results?: {
    summary: ReactNode;
    findings?: ReactNode[];
  };
}

const experiment: ExperimentContent = {
  title: 'LLM Context Interference Mapping',
  description:
    'Drei offene Sprachmodelle werden mit kontrollierten Prompt-Paaren (A, B) gefüttert. Gemessen werden Hidden States und Output-Verteilungen, um zu analysieren, wie Modelle komplementäre, widersprüchliche und irrelevante Kontexte überlagern.',
  status: 'Abgeschlossen',
  statusColor: 'bg-emerald-200/40 text-emerald-700',
  startDate: 'Nov 2025',
  motivation:
    'Grosse Sprachmodelle werden typischerweise mit sehr viel Kontext gefüttert – Dokumente, Systemprompts, Tool-Outputs. Intuitiv gehen wir davon aus, dass das Modell diesen Kontext „vernünftig“ mischt. Dieses Experiment untersucht systematisch, wie stark sich die Ausgabe eines Modells verändert, wenn mehrere Kontexte gleichzeitig präsent sind und wie sich diese Interferenz je nach Modell unterscheidet.',
  context:
    'Das Experiment ist inspiriert von Arbeiten zu Superposition. Statt nur auf Beispiel-Antworten zu schauen, wird die Geometrie der letzten Hidden States sowie die Token-Logit-Verteilungen analysiert, um nichtlineare Kompositionseffekte sichtbar zu machen.',
  setup: (
    <>
      Es wurden drei offene Modelle untersucht: Mistral-7B-Instruct, Qwen2-7B und Phi-3 Mini. Für jedes Modell wurde ein einheitlicher Datensatz
      aus Prompt-Paaren (A, B) erstellt, unterteilt in vier Kategorien: komplementär, konfliktiv, kontrolliert (A = B) und irrelevant. Für jedes Paar
      wurden die letzten Hidden States und die Output-Verteilungen für A, B und die Kombination AB extrahiert. Zusätzlich wurde eine lineare Mischung
      der Einzelzustände berechnet (
      <InlineMath math="h_{\text{lin}} = 0.5 \cdot h_A + 0.5 \cdot h_B" />
      ), um AB mit einer idealisierten „linearen Komposition“ zu vergleichen.
    </>
  ),
  hypotheses: [
    'Konflikt-Prompts erzeugen stärkere Interferenz (höhere KL- und L2-Distanzen zwischen AB und der linearen/mischbasierten Baseline) als komplementäre oder kontrollierte Paare.',
    'Irrelevante Zusatzkontexte führen zu messbarer, aber systematisch geringerer Interferenz als echte Konflikte.',
    <>
      Die Geometrie der Hidden States (z.&nbsp;B. Cosine-Similarity zwischen <InlineMath math="h_{AB}" /> und <InlineMath math="h_{\text{lin}}" />)
      korreliert mit der Stärke der beobachteten Interferenz auf der Output-Ebene.
    </>,
    'Verschiedene Modellfamilien zeigen charakteristische Interferenz-Profile – Interferenz ist also nicht nur Prompt-, sondern auch Modell-spezifisch.'
  ],
  methodology: (
    <>
      Für jedes Prompt-Paar wurden Token-Logit-Verteilungen für die nächste Wortvorhersage in den Zuständen A, B und AB berechnet. Zusätzlich wurde aus
      den Hidden States ein linearer Referenzzustand <InlineMath math="h_{\text{lin}}" /> konstruiert. Auf dieser Basis wurden KL-Divergenzen und L2-Distanzen
      zwischen <InlineMath math="p_{AB}" /> und zwei Baselines ausgewertet: (1) einer linearen Mischung der Logits bzw. Distributionen von A und B,
      (2) einer unabhängigen „Mix“-Baseline. Die Auswertung erfolgte pro Kategorie und pro Modell sowie über Modelle hinweg (mittlere KL/L2-Werte nach Kategorie).
    </>
  ),
  challenges: [
    'Harmonisierung von Tokenisierung und Sequenzlängen über verschiedene Modellfamilien hinweg, um vergleichbare Hidden-State-Positionen zu erhalten.',
    'Interpretation sehr hoher Cosine-Similarities in den letzten Layern, in denen semantische Unterschiede nur noch als kleine Richtungsverschiebungen auftreten.',
    'Stabile Extraktion und Serialisierung grosser Hidden-State-Tensoren bei begrenzten Ressourcen (lokal, mps).',
    'Abgrenzung zwischen statistisch signifikanter Interferenz und normaler Sampling-Variabilität in den Output-Verteilungen.'
  ],
  nextSteps: [
    'Erweiterung des Datensatzes um zusätzliche Kategorien (z.B. Hierarchie-Konflikte, stilistische Konflikte, mehrstufige Instruktionsketten).',
    'Analyse früherer Layer, um zu untersuchen, ob Interferenz bereits in tieferen Repräsentationsebenen sichtbar wird.',
    'Systematische Auswertung der Reihenfolge-Effekte (AB vs. BA) für alle Modelle.',
    'Übertragung der Ergebnisse in praktische Heuristiken für Prompt-Design und Agenten-Orchestrierung (z.B. Kontext-Splitting, sequentielle statt paralleler Instruktion).',
    'Aufbereitung der Resultate in einem Blogpost / Tech-Report, inklusive Code-Repository und Visualisierungen.'
  ],
  technologies: ['Python', 'PyTorch', 'Transformers', 'Mistral-7B-Instruct', 'Qwen2-7B', 'Phi-3 Mini', 'NumPy', 'Matplotlib'],
  keyConcepts: ['Context Interference', 'Hidden State Geometry', 'Nonlinear Composition', 'Logit Distributions', 'LLM Interpretability'],
  relatedExperiments: ['cognitive-fusion-layer', 'agentic-ecosystem-drift'],
  githubLink: 'https://github.com/AliciaMartinelli/ai-lab/tree/main/llm-context-interference',
  demoLink: null,
  results: {
    summary: (
      <>
        Das Experiment zeigt, dass LLMs Kontext nicht einfach linear überlagern. Die kombinierten Zustände AB weichen systematisch von einer idealisierten linearen Mischung der Einzelkontexte ab – sowohl in der Geometrie der Hidden States als auch in den Output-Verteilungen. Die Abweichung wird klar, wenn{' '}
        <InlineMath math="h_{AB}" /> mit <InlineMath math="h_{\text{lin}}" /> verglichen wird. Die Stärke und Struktur dieser Interferenz ist modellabhängig.
      </>
    ),
    findings: [
      'Mistral-7B zeigt ein gut interpretierbares Interferenzmuster: Die KL- und L2-Distanzen sind moderat und sortieren sich sinnvoll nach Kategorie (Konflikt > komplementär ≈ irrelevant > Kontrolle A = B). Konflikt-Prompts verschieben die Output-Verteilung deutlich stärker weg von der linearen Baseline als komplementäre Paare.',
      'Phi-3 Mini verhält sich fast linear: Die KL- und L2-Werte sind insgesamt klein, AB liegt geometrisch nahe an A und B sowie an der linearen Mischung. Kontext-Überlagerung erzeugt hier nur schwache Interferenz – das Modell scheint Kontexte eher „sanft“ zu mischen.',
      'Für Qwen2-7B zeigen sich sehr hohe KL- und L2-Werte (teilweise auch für Kontroll-Prompts) bei gleichzeitig degenerierten Geometrie-Metriken. Das deutet eher auf einen Implementations-/Skalierungs-Mismatch in dieser Messkonfiguration hin als auf ein sinnvolles Interferenzprofil, die Resultate für Qwen2-7B werden daher als explorativ und vorläufig eingeordnet.',
      'Über alle Modelle hinweg liegen irrelevante Zusatzkontexte teilweise näher bei Konflikt-Prompts als erwartet. Einfach „noch mehr Kontext anhängen“ ist also nicht neutral: selbst scheinbar irrelevante Informationen können die Verteilung spürbar verschieben.',
      'Die Cosine-Similarities der Hidden States sind insgesamt sehr hoch, dennoch zeigen kleine Richtungsänderungen konsistente Effekte auf der Output-Ebene. Das spricht dafür, dass bereits feine geometrische Verschiebungen im letzten Layer semantisch relevante Interferenz repräsentieren.'
    ]
  }
};

export default function LLMContextInterferencePage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="font-public-sans text-4xl font-semibold">
              <span className="gradient-text">{experiment.title}</span>
            </h1>
            <StatusBadge status={experiment.status} color={experiment.statusColor} />
          </div>
          <p className="text-lg text-am-ink/70 mb-6">{experiment.description}</p>

          <div className="flex gap-4">
            <a
              href={experiment.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button px-6 py-3 rounded-pill text-sm font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub Repository
            </a>
            {experiment.demoLink && (
              <a
                href={experiment.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button px-6 py-3 rounded-pill text-sm font-medium"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Motivation & Kontext */}
            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Motivation & Kontext</h2>
              <p className="text-am-ink/80 mb-4">{experiment.motivation}</p>
              <p className="text-am-ink/70">{experiment.context}</p>
            </GlassCard>

            {/* Experimentaufbau */}
            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Experimentaufbau</h2>
              <p className="text-am-ink/80">{experiment.setup}</p>
            </GlassCard>

            {/* Hypothesen & Ziele */}
            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Hypothesen & Ziele</h2>
              <ul className="space-y-2">
                {experiment.hypotheses.map((hypothesis, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-am-razz mt-1">•</span>
                    <span className="text-am-ink/80">{hypothesis}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Methodologie */}
            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Methodologie</h2>
              <p className="text-am-ink/80">{experiment.methodology}</p>
            </GlassCard>

            {/* Visualisierungen & Metriken */}
            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Visualisierungen & Metriken</h2>

              <p className="text-am-ink/80 mb-4">
                Die Grafiken zeigen, wie stark die Modelle auf unterschiedliche Kontext-Kombinationen reagieren und wie sehr sich die
                gemeinsame Antwort AB von einer einfachen Mischung der Einzelkontexte A und B entfernt.
              </p>

              <div className="space-y-6">
                {/* Modellvergleich KL */}
                <figure className="space-y-2">
                  <Image
                    src={compareModelsKl}
                    alt="Vergleich der Modelle – mittlere KL-Divergenz pro Kategorie"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Mittlere KL-Divergenz zwischen der tatsächlichen Output-Verteilung <InlineMath math="p_{AB}" /> und der linearen Baseline.
                    KL misst vereinfacht, wie stark sich eine Verteilung von einer anderen unterscheidet. Hohe Balken bedeuten: das Modell reagiert
                    empfindlich auf die Kombination der Kontexte.
                  </figcaption>
                </figure>

                {/* Modellvergleich L2 */}
                <figure className="space-y-2">
                  <Image
                    src={compareModelsL2}
                    alt="Vergleich der Modelle – mittlere L2-Distanz pro Kategorie"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Die gleiche Auswertung mit L2-Distanz. L2 ist die „Luftlinien-Distanz“ zwischen zwei Wahrscheinlichkeitsverteilungen.
                    Je höher der Wert, desto weiter sind die Antworten im Wahrscheinlichkeitsraum auseinander.
                  </figcaption>
                </figure>

                {/* Mistral Summary */}
                <figure className="space-y-2">
                  <Image
                    src={summaryL2Mistral}
                    alt="Interferenzstaerke pro Kategorie – Mistral-7B"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    L2-Distanzen für Mistral-7B, aufgeteilt nach Kategorien. Jede Box ist ein Boxplot: der orange Balken ist der Median,
                    die Box zeigt die typische Streuung, Kreise markieren Ausreisser. Man sieht klar: Konflikt-Kontexte erzeugen im Mittel
                    die staerkste Verschiebung.
                  </figcaption>
                </figure>

                {/* Qwen2 Summary */}
                <figure className="space-y-2">
                  <Image
                    src={summaryL2Qwen2}
                    alt="Interferenzstaerke pro Kategorie – Qwen2-7B"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    L2-Distanzen für Qwen2-7B. Die Werte liegen insgesamt deutlich höher als bei Mistral-7B oder Phi-3 Mini, was auf eine
                    sehr starke Reaktion des Modells auf Kontextkombinationen hindeutet. Diese Resultate werden im Experiment als vorläufig
                    interpretiert, da auch Skalierungsfragen eine Rolle spielen koennen.
                  </figcaption>
                </figure>

                {/* Phi3 Summary */}
                <figure className="space-y-2">
                  <Image
                    src={summaryL2Phi3}
                    alt="Interferenzstaerke pro Kategorie – Phi-3 Mini"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    L2-Distanzen für Phi-3 Mini. Alle Kategorien liegen relativ tief beieinander – das Modell mischt die Kontexte fast linear
                    und reagiert insgesamt deutlich „sanfter“ als die beiden groesseren Modelle.
                  </figcaption>
                </figure>
              </div>

              <div className="mt-6">
                <h3 className="font-public-sans text-xl font-semibold mb-2">Metriken kurz erklärt</h3>
                <ul className="space-y-2 text-am-ink/80 text-sm">
                  <li>
                    <strong>KL-Divergenz:</strong> misst, wie stark sich zwei Wahrscheinlichkeitsverteilungen unterscheiden.
                    0 bedeutet: identisch. Je hoeher der Wert, desto mehr hat sich die Antworttendenz des Modells verschoben.
                  </li>
                  <li>
                    <strong>L2-Distanz:</strong> geometrische Distanz zwischen zwei Verteilungen. Man kann sie sich vorstellen wie die
                    direkte Distanz zwischen zwei Punkten – nur dass die Punkte hier Wahrscheinlichkeitsvektoren sind.
                  </li>
                  <li>
                    <strong>Boxplots:</strong> zeigen nicht nur einen einzelnen Wert, sondern die ganze Verteilung ueber viele Prompt-Paare.
                    So sieht man auf einen Blick typische Werte, Streuung und Ausreisser innerhalb einer Kategorie.
                  </li>
                </ul>
              </div>
            </GlassCard>

            {/* Ergebnisse & Interpretation */}
            {experiment.results && (
              <GlassCard className="p-8">
                <h2 className="font-public-sans text-2xl font-semibold mb-4">Ergebnisse & Interpretation</h2>
                <p className="text-am-ink/80 mb-4">{experiment.results.summary}</p>
                {experiment.results.findings && (
                  <ul className="space-y-2">
                    {experiment.results.findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-am-periwinkle mt-1">•</span>
                        <span className="text-am-ink/80">{finding}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <GlassCard className="p-6">
              <h3 className="font-public-sans font-semibold text-lg mb-4">Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-am-ink/70">Status:</span>
                  <StatusBadge status={experiment.status} color={experiment.statusColor} />
                </div>
                <div className="flex justify-between">
                  <span className="text-am-ink/70">Start:</span>
                  <span className="text-am-ink">{experiment.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-am-ink/70">Dauer:</span>
                  <span className="text-am-ink">1 Monat</span>
                </div>
              </div>
            </GlassCard>

            {/* Technologie-Stack */}
            <GlassCard className="p-6">
              <h3 className="font-public-sans font-semibold text-lg mb-4">Technologie-Stack</h3>
              <div className="flex flex-wrap gap-2">
                {experiment.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-am-periwinkle/20 text-am-ink text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Key Concepts */}
            <GlassCard className="p-6">
              <h3 className="font-public-sans font-semibold text-lg mb-4">Key Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {experiment.keyConcepts.map((concept, index) => (
                  <span key={index} className="px-3 py-1 bg-am-lilac/20 text-am-ink text-sm rounded-full">
                    {concept}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* CTA */}
            <GlassCard className="p-6 text-center">
              <h3 className="font-public-sans font-semibold text-lg mb-4">Mitmachen</h3>
              <p className="text-sm text-am-ink/70 mb-4">Interesse an diesem Experiment? Diskutiere mit oder trage bei!</p>
              <div className="space-y-2">
                <a
                  href={experiment.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-button px-4 py-2 rounded-pill text-sm font-medium"
                >
                  GitHub Discussion
                </a>
                <a href="/contact" className="block glass-button px-4 py-2 rounded-pill text-sm font-medium">
                  Kontakt aufnehmen
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}