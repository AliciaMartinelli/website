import { ReactNode } from 'react';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';

interface PlannedExperiment {
  title: string;
  status: string;
  statusColor: string;
  startDate: string;
  description: string;
  goal: ReactNode;
  motivation: ReactNode;
  loop: ReactNode;
  hypotheses: string[];
  researchQuestions: string[];
  nextSteps: string[];
  technologies: string[];
  keyConcepts: string[];
}

const experiment: PlannedExperiment = {
  title: 'Dream Synthesis Simulation',
  status: 'In Planung',
  statusColor: 'bg-am-apricot/20 text-am-apricot',
  startDate: 'Q1 2026',
  description:
    'Iteratives Ping-Pong zwischen Text- und Bildmodellen: Ein Sprachmodell beschreibt eine Szene, ein Bildmodell visualisiert sie, danach interpretiert das Sprachmodell das Bild erneut – mehrere Runden lang.',
  goal: (
    <>
      Untersuchen, ob durch den kontinuierlichen Austausch zwischen Text- und Bildrepräsentationen eine eigenständige „Traumlogik“ entsteht, die
      sich schrittweise von der ursprünglichen Instruktion löst. Das Experiment versteht sich als erste Annäherung an ein maschinelles
      Unterbewusstsein: Systeme sollen nicht nur antworten, sondern frei assoziieren.
    </>
  ),
  motivation: (
    <>
      Multimodale Modelle sind heute überwiegend Einweg-Systeme: Prompt rein, Output raus. Was fehlt, ist ein zyklischer Prozess, bei dem Modelle selbst
      zu ihrem Kontext werden. Traumforschung kennt diese Schleifen – Erinnerungen, die rekombiniert werden, bis ein neues Narrativ entsteht.
      Dream Synthesis Simulation überträgt dieses Prinzip auf LLMs und Diffusion Models.
    </>
  ),
  loop: (
    <>
      1) Textmodell beschreibt eine Szene (Prompt A). 2) Bildmodell (z.&nbsp;B. Stable Diffusion XL) generiert ein Motiv. 3) Das Textmodell erhält nur das Bild
      (per Captioning/Visual Question Answering) und beschreibt, was es erkennt. 4) Diese neue Beschreibung wird zurück in das Bildmodell gegeben.
      Nach n Iterationen analysiere ich Divergenz, entstehende Themen und die Stabilität der Narration.
    </>
  ),
  hypotheses: [
    'Die Beschreibungen entfernen sich progressiv vom Ursprungstext und entwickeln wiederkehrende Motive, die nicht explizit vorgegeben wurden.',
    'Bild-zu-Text-Interpretationen verstärken bestimmte visuelle Artefakte, wodurch sich „Traum-Logiken“ herausbilden (z.B. flüssige Übergänge, Metamorphosen).',
    'Die Stabilität des Zyklus hängt stark vom gewählten Modellpaar ab (z.B. GPT-4o vs. Llama Vision kombiniert mit Stable Diffusion XL vs. Flux).'
  ],
  researchQuestions: [
    'Wie schnell driftet die Szene semantisch weg vom Ausgangsprompt?',
    'Welche Token-/Bildmuster tauchen in jeder Runde wieder auf, obwohl sie nie explizit angefordert wurden?',
    'Lässt sich die Drift gezielt steuern (z.B. mehr Surrealismus vs. kohärente Story)?',
    'Welche Rolle spielen Modelltemperatur, Guidance Scale und Negativ-Prompts im Verlauf der Traum-Schleife?'
  ],
  nextSteps: [
    'Kurzes Pilot-Setup mit zwei Modellpaaren und fünf Iterationen, um Metriken für Divergenz und Motiv-Wiederholung zu definieren.',
    'Aufbau eines Logging-Frameworks (Weights & Biases) zur Versionierung aller Prompts, Seeds und generierten Assets.',
    'Evaluations-Interface mit Timeline-Ansicht, damit Iterationen auditierbar und teilbar sind.',
    'Recherche zu kognitiver Traumforschung (Traumdeutung, freie Assoziation), um Analysen sinnvoll einzuordnen.'
  ],
  technologies: ['GPT-4o / Vision LLM', 'Stable Diffusion XL', 'Flux', 'CLIP', 'Python', 'PyTorch', 'Weights & Biases', 'Next.js Dashboard'],
  keyConcepts: ['Traumlogik', 'Multimodale Feedback-Schleifen', 'Emergente Narrative', 'Vision-Language Alignment']
};

export default function DreamSynthesisSimulationPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="font-public-sans text-4xl font-semibold">
              <span className="gradient-text">{experiment.title}</span>
            </h1>
            <StatusBadge status={experiment.status} color={experiment.statusColor} />
          </div>
          <p className="text-lg text-am-ink/70 mb-4">{experiment.description}</p>
          <div className="flex gap-6 text-sm text-am-ink/70">
            <div>
              <span className="uppercase tracking-wide text-am-ink/50 block text-[11px]">Start</span>
              <span className="text-am-ink font-medium">{experiment.startDate}</span>
            </div>
            <div>
              <span className="uppercase tracking-wide text-am-ink/50 block text-[11px]">Status</span>
              <span className="text-am-ink font-medium">{experiment.status}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            <GlassCard className="p-8 space-y-4">
              <h2 className="font-public-sans text-2xl font-semibold">Zielbild</h2>
              <p className="text-am-ink/80">{experiment.goal}</p>
            </GlassCard>

            <GlassCard className="p-8 space-y-4">
              <h2 className="font-public-sans text-2xl font-semibold">Motivation</h2>
              <p className="text-am-ink/80">{experiment.motivation}</p>
            </GlassCard>

            <GlassCard className="p-8 space-y-4">
              <h2 className="font-public-sans text-2xl font-semibold">Traum-Schleife</h2>
              <p className="text-am-ink/80">{experiment.loop}</p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Hypothesen</h2>
              <ul className="space-y-2">
                {experiment.hypotheses.map((hypothesis, idx) => (
                  <li key={idx} className="flex gap-2 text-am-ink/80">
                    <span className="text-am-apricot">•</span>
                    <span>{hypothesis}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Research Questions</h2>
              <ul className="space-y-2">
                {experiment.researchQuestions.map((question, idx) => (
                  <li key={idx} className="flex gap-2 text-am-ink/80">
                    <span className="text-am-periwinkle">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Next Steps</h2>
              <ul className="space-y-2">
                {experiment.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-2 text-am-ink/80">
                    <span className="text-am-lilac">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="font-public-sans font-semibold text-lg mb-3">Technologien</h3>
              <div className="flex flex-wrap gap-2">
                {experiment.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-am-apricot/20 text-am-ink text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-public-sans font-semibold text-lg mb-3">Key Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {experiment.keyConcepts.map(concept => (
                  <span key={concept} className="px-3 py-1 bg-am-periwinkle/20 text-am-ink text-sm rounded-full">
                    {concept}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-public-sans font-semibold text-lg mb-3">Status Update</h3>
              <p className="text-sm text-am-ink/70">
                Derzeit recherchiere ich Referenzarbeiten zu Traumsimulation und Visual-Language-Loops, stelle einen Prompt-Datensatz zusammen und teste
                Modellkombinationen lokal. Updates folgen, sobald der erste Zyklus geloggt ist.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

