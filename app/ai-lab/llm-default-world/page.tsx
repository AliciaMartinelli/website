import { ReactNode } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';
import { InlineMath } from 'react-katex';

// Importiere die Visualisierungen
import finalSummary from './media/final_summary.png';
import comparisonGender from './media/comparison_gender.png';
import comparisonSkinColor from './media/comparison_skin_color.png';
import comparisonLanguage from './media/comparison_language.png';
import comparisonReligion from './media/comparison_religion.png';
import comparisonSexualOrientation from './media/comparison_sexual_orientation.png';
import comparisonAge from './media/comparison_age.png';
import comparisonEconomicStatus from './media/comparison_economic_status.png';
import comparisonEducationLevel from './media/comparison_education_level.png';
import comparisonFamilyStatus from './media/comparison_family_status.png';
import comparisonHealthStatus from './media/comparison_health_status.png';
import comparisonPoliticalOrientation from './media/comparison_political_orientation.png';
import comparisonProfession from './media/comparison_profession.png';
import comparisonResidence from './media/comparison_residence.png';

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
  title: 'Model Priors & Average World',
  description:
    'Fünf offene Sprachmodelle werden mit minimalen, ungeführten Fragen zu menschlichen Attributen konfrontiert. Durch wiederholtes Sampling wird der statistische "Durchschnittsmensch" und die "Durchschnittswelt" rekonstruiert, die in den Modellen kodiert sind.',
  status: 'Abgeschlossen',
  statusColor: 'bg-emerald-200/40 text-emerald-700',
  startDate: 'Dez 2025',
  motivation: (
    <>
      Sprachmodelle approximieren eine Wahrscheinlichkeitsverteilung über menschliche Sprache: <InlineMath math="P_\theta(x) \approx P_{\text{human}}(x)" />.
      Durch wiederholtes Abfragen minimaler Prompts wie "What gender does a typical human being have?" schätzen wir direkt{' '}
      <InlineMath math="P_\theta(\text{attribute})" />. Dies liefert eine quantitative Messung der impliziten kulturellen und demografischen Defaults,
      die in den Modellen kodiert sind – der "Durchschnittsmensch" und die "Durchschnittswelt", die das Modell als wahrscheinlichste Annahme hat.
    </>
  ),
  context: (
    <>
      Das Experiment misst nicht reale Bevölkerungsstatistiken. Stattdessen misst es, was das Modell "denkt", wenn es keinen zusätzlichen Kontext erhält –
      die Maximum-Likelihood-Default-Welt, die in den Gewichten kodiert ist. Dies macht implizite Annahmen explizit und messbar.
    </>
  ),
  setup: (
    <>
      Es wurden fünf offene Modelle untersucht: <strong>Mistral-7B-Instruct</strong>, <strong>Llama3-8B</strong>, <strong>Qwen2-7B</strong>,{' '}
      <strong>Phi-3</strong> und <strong>Gemma2-9B</strong>.       Für jedes Modell wurden 13 Attribute gemessen: Gender, Hautfarbe, Religion, Alter,
      Wohnort, Sprache, Beruf, sexuelle Orientierung, Bildungsniveau, wirtschaftlicher Status, politische Orientierung, Familienstatus und
      Gesundheitsstatus. Für jedes Attribut wurden <InlineMath math="N = 100" /> Ein-Wort-Antworten gesampelt und anschließend manuell kategorisiert, um die Prior-Verteilung zu schätzen.
    </>
  ),
  hypotheses: [
    'Verschiedene Modelle zeigen unterschiedliche Default-Annahmen für dieselben Attribute, was kulturelle Bias in den Trainingsdaten widerspiegelt.',
    'Modelle aus verschiedenen kulturellen Kontexten (z.B. Qwen2 aus China) zeigen charakteristische Bias-Muster, die von westlichen Modellen abweichen.',
    'Instruct-Modelle zeigen andere Prior-Verteilungen als Base-Modelle, da Alignment-Training die Defaults verändert.',
    'Einige Attribute (z.B. Sprache) zeigen sehr homogene Antworten (starker Default), während andere (z.B. Beruf) diverser sind.'
  ],
  methodology: (
    <>
      Für jedes Modell und Attribut wurden <InlineMath math="N = 100" /> Ein-Wort-Antworten mit demselben minimalen Prompt gesampelt. Die Antworten
      wurden in JSON-Format angefordert, um strukturierte Extraktion zu ermöglichen. Anschließend wurden alle Antworten manuell kategorisiert, um
      semantisch ähnliche Antworten zu gruppieren (z.B. "male" und "männlich"). Die Top-Werte pro Attribut und Modell wurden in einer finalen Zusammenfassung visualisiert.
    </>
  ),
  challenges: [
    'JSON-Parsing für numerische Werte (Alter) funktionierte nur bei Mistral zuverlässig – andere Modelle produzierten viele Parsing-Fehler.',
    'Einige Modelle (besonders Llama3) produzierten häufig unklare oder abgeschnittene Antworten ("here", "i", etc.), die gefiltert werden mussten.',
    'Die Fragen mussten präzise formuliert werden, um generische Antworten ("home", "earth") zu vermeiden.',
    'Kulturelle Bias ist schwer zu quantifizieren – die Ergebnisse zeigen implizite Annahmen, aber nicht notwendigerweise problematische Bias.'
  ],
  nextSteps: [
    'Verbesserung des JSON-Parsing für numerische Werte, um zuverlässigere Alters-Messungen zu erhalten.',
    'Erweiterung auf mehr Modelle und Modellfamilien, um kulturelle Bias-Muster systematischer zu untersuchen.',
    'Bedingte Priors: Messung, wie sich Priors ändern, wenn zusätzlicher Kontext gegeben wird (z.B. "There is a human being in Africa...").',
    'Cross-Language-Experimente: Dieselben Prompts in verschiedenen Sprachen ausführen und Priors vergleichen.',
    'Diversitäts-Metriken: Entropie, Simpson-Index oder andere Diversitätsmaße für jedes Attribut berechnen.'
  ],
  technologies: [
    'Python',
    'Ollama',
    'Mistral-7B-Instruct',
    'Llama3-8B',
    'Qwen2-7B',
    'Phi-3',
    'Gemma2-9B',
    'Pandas',
    'Matplotlib',
    'NumPy',
    'SciPy'
  ],
  keyConcepts: [
    'Model Priors',
    'Cultural Bias',
    'Default World',
    'Statistical Defaults',
    'Demographic Assumptions',
    'LLM Bias Auditing'
  ],
  relatedExperiments: ['llm-context-interference'],
  githubLink: 'https://github.com/AliciaMartinelli/ai-lab/tree/main/llm-default-world',
  demoLink: null,
  results: {
    summary: (
      <>
        Das Experiment zeigt deutliche kulturelle Bias-Muster in allen getesteten Modellen. Die stärksten Defaults sind bei <strong>Sprache</strong> (fast
        alle Modelle → "english", 77-100%) und <strong>Hautfarbe</strong> (kulturell geprägt: Qwen2 → "yellow" 79%, westliche Modelle → "beige/caucasian" 84-95%) sichtbar.
        Besonders auffällig sind auch die <strong>sexuelle Orientierung</strong> (Qwen2: 100% heterosexual, Phi3: 66% bisexuality) und <strong>Religion</strong>
        (Mistral/Gemma2: 100% nicht-religiös, Qwen2/Phi3: 36-52% christianity). Modelle aus verschiedenen kulturellen Kontexten zeigen charakteristische Unterschiede,
        was die Bedeutung von diversen Trainingsdaten unterstreicht.
      </>
    ),
    findings: [
      <>
        <strong>Kulturelle Bias ist messbar:</strong> Qwen2 (chinesisches Modell) zeigt asiatische Defaults ("yellow" für Hautfarbe, 79%), während
        westliche Modelle kaukasische Defaults bevorzugen (Mistral: 95% "beige", Llama3: 84% "caucasian"). Gemma2 und Phi3 zeigen "brown" (76-96%),
        was eine andere Perspektive darstellt. Dies zeigt, dass Trainingsdaten die impliziten Annahmen stark prägen.
      </>,
      <>
        <strong>Gender-Bias variiert stark:</strong> Llama3 zeigt einen sehr starken männlichen Bias (92% "male"), während Mistral einen weiblichen
        Default hat (66% "female"). Qwen2 und Phi3 weichen der Frage aus ("human", 66-80%), während Gemma2 abstrakt antwortet ("binary", 54%).
      </>,
      <>
        <strong>Sprach-Bias ist universell:</strong> Fast alle Modelle antworten mit "english" (77-100%), was den starken anglophonen Bias in den
        Trainingsdaten widerspiegelt. Nur Gemma2 weicht aus (66% "none").
      </>,
      <>
        <strong>Sexuelle Orientierung zeigt extreme Defaults:</strong> Qwen2 zeigt einen sehr starken heteronormativen Bias (100% "heterosexual"),
        während Phi3 überraschenderweise "bisexuality" bevorzugt (66%). Llama3 weicht der Frage aus (78% "refuse to answer"), was zeigt, dass
        Alignment-Training die Antworten beeinflusst.
      </>,
      <>
        <strong>Religion: Nicht-religiös vs. christlich:</strong> Mistral und Gemma2 bevorzugen nicht-religiöse Antworten (100% "agnostic"/"none"), während Qwen2
        und Phi3 christliche Defaults zeigen (36-52% "christianity"). Llama3 liegt dazwischen (70% "none").
      </>,
      <>
        <strong>Technische Herausforderungen:</strong> JSON-Parsing für numerische Werte funktionierte nur bei Mistral zuverlässig (58% → 28 Jahre).
        Andere Modelle produzierten 70-100% "error"-Antworten beim Alter, was zeigt, dass strukturierte Ausgaben nicht trivial sind.
      </>,
      <>
        <strong>Neue Attribute zeigen interessante Muster:</strong> Bei <strong>Bildungsniveau</strong> zeigen sich klare Unterschiede (Mistral: 60%
        "bachelor's", Qwen2: 100% "primary"). Bei <strong>wirtschaftlichem Status</strong> bevorzugen die meisten Modelle "middle class" (60-100%).
        <strong>Politische Orientierung</strong> ist fragmentiert, aber Llama3 zeigt 82% "centrist". <strong>Familienstatus</strong> variiert stark
        (Mistral: 100% "individual", Qwen2: 84% "single").
      </>,
      <>
        <strong>Modell-spezifische Muster:</strong> Mistral ist am ausgewogensten und technisch zuverlässigsten. Llama3 zeigt starke Bias, aber auch
        viele "no answer"-Antworten bei sensiblen Themen. Qwen2 zeigt kulturelle Charakteristika, aber auch sehr starke Defaults (100% heterosexual,
        100% primary education). Gemma2 antwortet oft abstrakt ("complex", "variable", "diverse").
      </>
    ]
  }
};

export default function LLMDefaultWorldPage() {
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
              <h2 className="font-public-sans text-2xl font-semibold mb-4">Visualisierungen & Ergebnisse</h2>

              <p className="text-am-ink/80 mb-4">
                Die Visualisierungen zeigen die Top-Werte pro Attribut für jedes Modell. Die Prozentangaben zeigen, wie häufig eine bestimmte
                Antwort gegeben wurde – höhere Werte bedeuten stärkere Default-Annahmen.
              </p>

              <div className="space-y-6">
                {/* Final Summary */}
                <figure className="space-y-2">
                  <Image
                    src={finalSummary}
                    alt="Finale Zusammenfassung – Top-Werte pro Attribut für alle Modelle"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Finale Zusammenfassung: Für jedes Attribut werden alle Modelle mit ihrem Top-Wert und dem entsprechenden Prozentsatz
                    angezeigt. Dies zeigt auf einen Blick, welche Default-Annahmen jedes Modell hat.
                  </figcaption>
                </figure>

                {/* Comparison Gender */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonGender}
                    alt="Vergleich Gender – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Gender-Vergleich: Llama3 zeigt sehr starken männlichen Bias (92%), während Mistral einen weiblichen Default hat (66% "female").
                    Qwen2 und Phi3 weichen der Frage aus ("human", 66-80%), Gemma2 antwortet abstrakt ("binary", 54%).
                  </figcaption>
                </figure>

                {/* Comparison Skin Color */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonSkinColor}
                    alt="Vergleich Hautfarbe – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Hautfarbe-Vergleich: Kulturelle Bias ist deutlich sichtbar – Qwen2 (chinesisch) antwortet mit "yellow" (79%), während
                    westliche Modelle "beige" (Mistral: 95%) oder "caucasian" (Llama3: 84%) bevorzugen. Gemma2 und Phi3 zeigen "brown" (76-96%).
                  </figcaption>
                </figure>

                {/* Comparison Language */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonLanguage}
                    alt="Vergleich Sprache – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Sprache-Vergleich: Fast alle Modelle antworten mit "english" (77-100%), was den starken anglophonen Bias in den
                    Trainingsdaten widerspiegelt. Nur Gemma2 weicht aus (66% "none").
                  </figcaption>
                </figure>

                {/* Comparison Religion */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonReligion}
                    alt="Vergleich Religion – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Religion-Vergleich: Mistral und Gemma2 bevorzugen nicht-religiöse Antworten (100% "agnostic"/"none"), während Qwen2 und Phi3 christliche
                    Defaults zeigen (36-52% "christianity"). Llama3 liegt dazwischen (70% "none").
                  </figcaption>
                </figure>

                {/* Comparison Sexual Orientation */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonSexualOrientation}
                    alt="Vergleich sexuelle Orientierung – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Sexuelle Orientierung-Vergleich: Qwen2 zeigt einen sehr starken heteronormativen Bias (100% "heterosexual"), während Phi3 überraschenderweise
                    "bisexuality" bevorzugt (66%). Llama3 weicht der Frage aus (78% "refuse to answer"), Mistral ist ausgewogener (47% "heterosexual").
                  </figcaption>
                </figure>

                {/* Comparison Age */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonAge}
                    alt="Vergleich Alter – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Alter-Vergleich: Nur Mistral konnte zuverlässig numerische Alterswerte liefern (28 Jahre, 58%). Andere Modelle produzierten 70-100% "error"-Antworten,
                    was zeigt, dass strukturierte numerische Ausgaben für viele Modelle eine Herausforderung darstellen.
                  </figcaption>
                </figure>

                {/* Comparison Education Level */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonEducationLevel}
                    alt="Vergleich Bildungsniveau – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Bildungsniveau-Vergleich: Mistral bevorzugt "bachelor's" (60%), während Qwen2 "primary" (100%) zeigt – ein extremer Default, der kulturelle Unterschiede
                    widerspiegelt. Llama3 und Gemma2 bevorzugen "secondary"/"high school" (72%).
                  </figcaption>
                </figure>

                {/* Comparison Economic Status */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonEconomicStatus}
                    alt="Vergleich wirtschaftlicher Status – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Wirtschaftlicher Status-Vergleich: Die meisten Modelle bevorzugen "middle class" (60-100%), was zeigt, dass dies als "typisch" angesehen wird.
                    Dies reflektiert möglicherweise die Dominanz westlicher Mittelschicht-Perspektiven in den Trainingsdaten.
                  </figcaption>
                </figure>

                {/* Comparison Political Orientation */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonPoliticalOrientation}
                    alt="Vergleich politische Orientierung – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Politische Orientierung-Vergleich: Die Antworten sind fragmentiert, aber Llama3 zeigt 82% "centrist", während Mistral 77% "neutral" bevorzugt.
                    Dies zeigt, dass Modelle bei politischen Themen eher ausweichende oder zentristische Positionen einnehmen.
                  </figcaption>
                </figure>

                {/* Comparison Family Status */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonFamilyStatus}
                    alt="Vergleich Familienstatus – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Familienstatus-Vergleich: Mistral antwortet mit 100% "individual", während Qwen2 84% "single" zeigt. Llama3 zeigt 40% "married".
                    Die Unterschiede zeigen verschiedene kulturelle Perspektiven auf Familienstrukturen.
                  </figcaption>
                </figure>

                {/* Comparison Health Status */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonHealthStatus}
                    alt="Vergleich Gesundheitsstatus – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Gesundheitsstatus-Vergleich: Mistral, Phi3 und Qwen2 bevorzugen "healthy" (57-100%), während Llama3 "average" (57%) zeigt.
                    Die meisten Modelle assoziieren "typisch" mit Gesundheit, was möglicherweise einen Optimismus-Bias widerspiegelt.
                  </figcaption>
                </figure>

                {/* Comparison Profession */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonProfession}
                    alt="Vergleich Beruf – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Beruf-Vergleich: Berufe zeigen eine hohe Diversität, was darauf hindeutet, dass es keinen starken Default gibt. Dies könnte darauf zurückzuführen sein,
                    dass Berufe stark kontextabhängig sind und Modelle verschiedene Perspektiven zeigen.
                  </figcaption>
                </figure>

                {/* Comparison Residence */}
                <figure className="space-y-2">
                  <Image
                    src={comparisonResidence}
                    alt="Vergleich Wohnort – alle Modelle"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-xl border border-white/10"
                  />
                  <figcaption className="text-sm text-am-ink/60">
                    Wohnort-Vergleich: Die Antworten variieren stark zwischen Modellen. Viele Modelle antworteten mit generischen Begriffen ("home", "earth"),
                    was zeigt, dass die Frage präziser formuliert werden muss, um aussagekräftige Ergebnisse zu erhalten.
                  </figcaption>
                </figure>
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
                  <span className="text-am-ink/70">Modelle:</span>
                  <span className="text-am-ink">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-am-ink/70">Attribute:</span>
                  <span className="text-am-ink">13</span>
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
