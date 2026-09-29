export interface FormQuestions {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  location: string;
  currentJourney: string;
  breakthroughArea: string;
  untappedPotential: string;
  readyForDirection: string;
  committedToRoadmap: string;
  investEnergy: string;
  whyMentor: string;
  breakthroughVision: string;
  preferredSlot?: string;
}

export interface Submission extends FormQuestions {
  id: string;
  timestamp: string;
  isMember: boolean;
  status: 'New' | 'Reviewing' | 'Scheduled' | 'Completed' | 'Archived';
  notes?: string;
}

export interface FunnelConfig {
  mentorName: string;
  mentorTitle: string;
  communityName: string;
  communityJoinUrl: string;
  checkoutUrl: string;
  googleSheetsWebhook: string;
  sessionDuration: string;
  sessionFormat: string;
  sessionInvestment: string;
  currency: string;
  notificationEmail: string;
}

export type ViewStep = 'gateway' | 'non-member' | 'form' | 'success' | 'admin';
