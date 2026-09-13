export interface Agent {
  id: string;
  number: string;
  name: string;
  initial: string;
  role: string;
  isCommander?: boolean;
  isExtraBump?: boolean;
  overbumpTeaser?: string;
  enemy: string;
  resolves: string;
  relieves: string;
  quote: string;
  signaturePhrase?: string;
  costAlone?: string;
}

export interface AgentMascot {
  mascotName: string;
  badgeColor: string;
  accentHex: string;
  cardBg: string;
  borderColor: string;
  glowColor: string;
  superpower: string;
  personality: string;
}

export interface MapCity {
  id: string;
  name: string;
  region: string;
  coords: { x: number; y: number };
  badge: string;
  photoUrl: string;
  rentEstimate: string;
  lifestyle: string;
  isPrimary: boolean;
}

export interface DestinationCard {
  id: string;
  name: string;
  region: string;
  category: 'mediterraneo' | 'centro' | 'sul' | 'norte' | string;
  photoUrl: string;
  photoAlt: string;
  description: string;
  badge: string;
  rentEstimate: string;
  keyFeature: string;
  waitingCall?: string;
}

export interface StrategicCity {
  id: string;
  name: string;
  region: string;
  category: 'mediterraneo' | 'centro' | 'sul' | 'norte' | string;
  photoUrl: string;
  photoAlt: string;
  description: string;
  badge: string;
  rentEstimate: string;
  keyFeature: string;
  waitingCall?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  badge: string;
  initials: string;
  quote: string;
  defaultImage: string;
  avatarBg: string;
  time?: string;
  category?: string;
}
