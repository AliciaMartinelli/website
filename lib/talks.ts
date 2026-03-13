export interface Talk {
  id: string;
  title: string;
  event: string;
  date: string; // ISO string
  location: string;
  highlight: string;
  description: string;
  homeSummary?: string;
  link?: string;
  slidesUrl?: string;
  note?: string;
}

const talkData: Talk[] = [
  {
    id: 'ai-horizons-2026',
    title: 'Willkommen im Agentic Web',
    event: 'AI Horizons 2026',
    date: '2025-11-27',
    location: 'Basel, CH',
    highlight: 'Wenn das Internet lernt, selbst zu handeln',
    description:
      'Das Web steht vor einer Transformation: Von statischen Seiten hin zu einem lebendigen Ökosystem autonomer Agenten. Ich zeige, wie AI-Agenten das Internet von einem passiven Informationsmedium zu einem handlungsfähigen System weiterentwickeln und welche Architektur-Patterns sich dafür bereits heute abzeichnen.',
    homeSummary: 'Ich zeige, wie AI-Agenten das Internet in ein agentisches Ökosystem verwandeln.',
    link: 'https://www.youtube.com/live/eDOVoU4Rh-o?si=eJhu-OUCIfdGW7uX&t=7136',
    slidesUrl: '/speaking/willkommen-im-agentic-web/willkommen-im-agentic-web.pdf',
    note: 'Der Vortrag wurde als Stream aufgenommen und ist auf YouTube verfügbar.'
  },
  {
    id: 'developer-meeting-ml-i',
    title: 'Machine Learning I',
    event: 'Developer Meeting',
    date: '2024-11-18',
    location: 'Basel, CH',
    highlight: 'Einführung in Machine Learning Grundlagen',
    description:
      'Ein Einführungsvortrag in Machine Learning für Entwickler:innen. Thematisiert wurden die vier Haupttypen des ML (Supervised, Unsupervised, Reinforcement, Generative), eine Vertiefung in Supervised Learning mit Regression und Klassifikation sowie praxisnahe Beispiele wie Wettervorhersage und Spam-Erkennung. Zusätzlich im Fokus: Modellbewertung mit Konfusionsmatrizen, ROC-Kurven, AUC und Optimierungsverfahren wie Gradientenverfahren, Sigmoid und Softmax.',
    slidesUrl: '/speaking/machine-learning-I/Machine%20Learning%20I.pdf',
    note: 'Firmeninterner Vortrag – Video nicht öffentlich verfügbar.'
  }
];

const parseDate = (value: string) => new Date(value);

export const talks: Talk[] = talkData;

export function formatTalkDate(date: string) {
  return parseDate(date).toLocaleDateString('de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getUpcomingTalk(list: Talk[] = talkData): Talk | undefined {
  const now = new Date();
  return [...list]
    .filter(talk => parseDate(talk.date) >= now)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())[0];
}

