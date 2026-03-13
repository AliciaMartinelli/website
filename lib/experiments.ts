export interface Experiment {
  title: string;
  status: string;
  startDate: string;
  slug: string;
  description: string;
}

export const experiments: Experiment[] = [
  {
    title: "LLM Context Interference Mapping",
    status: "Abgeschlossen",
    startDate: "Nov 2025",
    slug: "llm-context-interference",
    description: "Geometrie von Hidden States vs. lineare Mischungen, um Interferenz zwischen Prompt-Kontexten sichtbar zu machen."
  },
  {
    title: "Model Priors & Average World",
    status: "Abgeschlossen",
    startDate: "Dez 2025",
    slug: "llm-default-world",
    description: "Empirische Rekonstruktion des statistischen 'Durchschnittsmenschen' und 'Durchschnittswelt' in LLMs durch Messung ungeführter Ein-Wort-Priors."
  },
  {
    title: "Dream Synthesis Simulation",
    status: "In Planung",
    startDate: "Q1 2026",
    slug: "dream-synthesis-simulation",
    description: "Iterativer Ping-Pong zwischen Text- und Bildmodellen, um eine emergente Traumlogik und maschinelles Unterbewusstsein zu untersuchen."
  }
];
