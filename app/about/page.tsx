import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import SkillBar from '@/components/SkillBar';
import TimelineVertical from '@/components/TimelineVertical';
import { experiments } from '@/lib/experiments';
import { Metadata } from 'next';
import FullStackSkills from './FullStackSkills';

export const metadata: Metadata = {
  title: "Über mich - Alicia Martinelli",
  description: "AI Explorer & Engineer mit Expertise in Machine Learning, Full-Stack Development und Research. Bachelor Computer Science, Erfahrung in AI/ML und Community Building.",
  keywords: ["AI", "Machine Learning", "Full-Stack", "Computer Science", "Bio", "Über mich", "Expertise", "Skills"],
  openGraph: {
    title: "Über mich - Alicia Martinelli",
    description: "AI Explorer & Engineer mit Expertise in Machine Learning, Full-Stack Development und Research.",
    type: "profile",
  },
};

export default function AboutPage() {
  const timelineItems = [
    {
      id: 'full-stack-developer',
      title: 'Full-Stack Developer',
      period: 'Aug. 2025 - Heute',
      description: 'iRIX Software Engineering AG - Vollzeit-Entwicklung von Web- und Desktop-Anwendungen.',
      color: 'bg-am-razz/20'
    },
    {
      id: 'ai-explorer-engineer',
      title: 'AI Explorer & Engineer',
      period: 'Sep. 2024 - Heute',
      description: 'Privates Interesse an AI/ML: Supervised Learning, Deep Learning, CNN-Experimente und Community Building.',
      color: 'bg-am-periwinkle/20'
    },
    {
      id: 'junior-software-engineer',
      title: 'Junior Software Engineer',
      period: 'März 2023 - Aug. 2025',
      description: 'iRIX Software Engineering AG - Teilzeit-Entwicklung von Web-Apps (TypeScript, React.js, .NET) und Desktop-Anwendungen (Java, C#).',
      color: 'bg-am-lilac/20'
    },
    {
      id: 'praktikum',
      title: 'Praktikum Software Engineer',
      period: 'Sep. 2022 - Mai 2023',
      description: 'iRIX Software Engineering AG - Teilzeit-Praktikum mit Fokus auf Datenverarbeitung und -visualisierung für Solaranlagen.',
      color: 'bg-am-apricot/20'
    },
    {
      id: 'studium',
      title: 'Bachelor Computer Science',
      period: 'Sep. 2022 - Mai 2025',
      description: 'Universität Basel - Bachelor of Science in Computer Science mit Schwerpunkt Physik und Mathematik.',
      color: 'bg-am-rose/20'
    }
  ];

  const experimentStatusStyles: Record<string, string> = {
    Abgeschlossen: 'bg-emerald-200/40 text-emerald-700',
    'In Planung': 'bg-am-apricot/20 text-am-apricot',
    'In Arbeit': 'bg-am-periwinkle/20 text-am-periwinkle'
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="font-public-sans text-4xl font-semibold mb-6">
            <span className="gradient-text">Über mich</span>
          </h1>
          <div className="max-w-3xl">
            <p className="text-xl text-am-ink/80 mb-6 leading-relaxed">
              AI Explorer & Engineer mit Leidenschaft für die Zukunft der Technologie.
            </p>
            <p className="text-lg text-am-ink/70 leading-relaxed">
              Was mich antreibt? Die endlosen Möglichkeiten, die AI bietet, und die Chance, 
              diese Technologie mit anderen zu teilen und gemeinsam zu erkunden. 
              Ich mache das aus eigenem Interesse und liebe es, meine Entdeckungen zu teilen.
            </p>
          </div>
        </div>



        {/* Expertise mit Skill-Visualisierung */}
        <div className="mb-16">
          <h2 className="font-public-sans text-3xl font-semibold mb-8">
            <span className="gradient-text">Expertise</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI/ML - Linke Box */}
            <div>
              <GlassCard className="h-full p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-am-periwinkle/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-am-periwinkle" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="font-public-sans text-2xl font-semibold">AI/ML</h3>
                </div>
                <div className="space-y-4">
                  <SkillBar 
                    skill="Model Evaluation" 
                    level={90} 
                    color="bg-am-periwinkle" 
                    delay={0.1}
                    tooltip="Bewertung und Vergleich von Machine Learning Modellen mit verschiedenen Metriken wie Accuracy, Precision, Recall und F1-Score."
                  />
                  <SkillBar 
                    skill="Prompt Engineering" 
                    level={88} 
                    color="bg-am-periwinkle" 
                    delay={0.2}
                    tooltip="Kunst der Formulierung effektiver Prompts für Large Language Models, um optimale Ergebnisse zu erzielen."
                  />
                  <SkillBar 
                    skill="LLM Integration (RAG, APIs)" 
                    level={85} 
                    color="bg-am-periwinkle" 
                    delay={0.3}
                    tooltip="Integration von Large Language Models in Anwendungen mit Retrieval-Augmented Generation (RAG) und API-Verbindungen."
                  />
                  <SkillBar 
                    skill="Deep Learning Frameworks" 
                    level={65} 
                    color="bg-am-periwinkle" 
                    delay={0.4}
                    tooltip="Arbeit mit Frameworks wie TensorFlow, PyTorch und Keras für neuronale Netze und Deep Learning Modelle."
                  />
                  <SkillBar 
                    skill="Feature Engineering" 
                    level={75} 
                    color="bg-am-periwinkle" 
                    delay={0.5}
                    tooltip="Erstellung und Auswahl der besten Merkmale aus Rohdaten für Machine Learning Modelle."
                  />
                  <SkillBar 
                    skill="AutoML" 
                    level={50} 
                    color="bg-am-periwinkle" 
                    delay={0.6}
                    tooltip="Tools und Techniken zur Automatisierung des ML-Workflows von der Datenvorbereitung bis zum Modelltraining."
                  />
                  <SkillBar 
                    skill="Computer Vision (CNN)" 
                    level={20} 
                    color="bg-am-periwinkle" 
                    delay={0.7}
                    tooltip="Computer Vision mit Convolutional Neural Networks für Bilderkennung, Objekterkennung und Bildverarbeitung."
                  />
                  <SkillBar 
                    skill="AI Agents" 
                    level={10} 
                    color="bg-am-periwinkle" 
                    delay={0.8}
                    tooltip="Autonome AI-Systeme, die selbstständig Aufgaben ausführen, Entscheidungen treffen und mit ihrer Umgebung interagieren können."
                    futureGoals={[
                      { year: 2025, additionalLevel: 20, color: "bg-am-lilac" },
                      { year: 2026, additionalLevel: 20, color: "bg-am-apricot" }
                    ]}
                  />
                  <SkillBar 
                    skill="Vector Databases" 
                    level={1} 
                    color="bg-am-periwinkle" 
                    delay={0.9}
                    tooltip="Spezialisierte Datenbanken für die Speicherung und Suche von Vektoren (Embeddings) für RAG-Systeme und semantische Suche."
                    futureGoals={[
                      { year: 2025, additionalLevel: 20, color: "bg-am-lilac" },
                      { year: 2026, additionalLevel: 20, color: "bg-am-apricot" }
                    ]}
                  />
                  <SkillBar 
                    skill="AI Safety" 
                    level={5} 
                    color="bg-am-periwinkle" 
                    delay={1.0}
                    tooltip="Sicherheitsaspekte und ethische Überlegungen bei der Entwicklung von AI-Systemen, um Risiken zu minimieren."
                    futureGoals={[
                      { year: 2026, additionalLevel: 10, color: "bg-am-apricot" }
                    ]}
                  />
                </div>
              </GlassCard>
            </div>

            {/* Rechte Seite - Full-Stack & Research (jeweils halbe Höhe) */}
            <div className="flex flex-col space-y-6 h-full">
              {/* Full-Stack Engineering - Obere Hälfte */}
              <GlassCard className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-am-lilac/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-am-lilac" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-public-sans text-xl font-semibold">Full-Stack Engineering</h3>
                </div>
                <FullStackSkills />
              </GlassCard>
              
              {/* Research & Prototyping - Untere Hälfte */}
              <GlassCard className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-am-apricot/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-am-apricot" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-public-sans text-xl font-semibold">Research & Prototyping</h3>
                </div>
                
                {/* Scrollbare Experimente Liste */}
                <div className="max-h-64 overflow-y-auto scrollbar-hide">
                  <div className="space-y-2">
                    {experiments.map((experiment, index) => (
                      <div key={index} className="p-3 bg-white/10 rounded-lg border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                experimentStatusStyles[experiment.status] ?? 'bg-am-apricot/20 text-am-apricot'
                              }`}
                            >
                              {experiment.status}
                            </span>
                            <span className="text-sm text-am-ink/80 font-medium">
                              {experiment.title}
                            </span>
                          </div>
                          <a 
                            href={`/ai-lab/${experiment.slug}`}
                            className="text-am-apricot text-xs font-medium hover:underline flex-shrink-0"
                          >
                            Details →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* AI Lab Link */}
                <div className="mt-4 text-center">
                  <a href="/ai-lab" className="text-am-apricot text-sm font-medium hover:underline">
                    Alle Experimente →
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Zertifikate & Weiterbildungen */}
        <div className="mb-16">
          <h2 className="font-public-sans text-3xl font-semibold mb-8">
            <span className="gradient-text">Zertifikate & Weiterbildungen</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'AI Fluency: Framework & Foundations', provider: 'Anthropic', date: 'März 2026' },
              { title: 'Claude 101', provider: 'Anthropic', date: 'März 2026' },
              { title: 'Claude Code in Action', provider: 'Anthropic', date: 'März 2026' },
              { title: 'Introduction to Model Context Protocol', provider: 'Anthropic', date: 'März 2026' },
              { title: 'Branchenwissen Energie', provider: 'VSE (Verband Schweizerischer Elektrizitätsunternehmen)', date: 'März 2026' },
            ].map((cert, index) => (
              <GlassCard key={index} className="p-5">
                <h3 className="font-public-sans font-semibold text-sm mb-1">{cert.title}</h3>
                <p className="text-xs text-am-ink/60">{cert.provider} · {cert.date}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Werdegang - Vertikale Timeline */}
        <div className="mb-16">
          <h2 className="font-public-sans text-3xl font-semibold mb-8">
            <span className="gradient-text">Werdegang</span>
          </h2>
          <TimelineVertical items={timelineItems} />
        </div>

      </section>
    </PageTransition>
  );
}