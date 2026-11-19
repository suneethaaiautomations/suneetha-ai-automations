export type PageId =
  | 'home'
  | 'services'
  | 'pricing'
  | 'portfolio'
  | 'about'
  | 'book'
  | 'contact';

export type PortfolioCategory =
  | 'All Projects'
  | 'WhatsApp Automation'
  | 'Telegram Bots'
  | 'Email Automation'
  | 'AI Voice Agents'
  | 'n8n Workflows';

export type ServiceOptionLabel =
  | 'WhatsApp AI Automation'
  | 'Telegram AI Bot'
  | 'Email Automation'
  | 'AI Voice Agent'
  | 'n8n Workflow'
  | 'Custom AI Solution';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  pricingCardTitle: string;
  bookingOption: ServiceOptionLabel;
  shortDescription: string;
  startingPrice: string;
  isCustomQuote?: boolean;
  iconName: 'MessageSquare' | 'Send' | 'Mail' | 'PhoneCall' | 'Workflow' | 'Cpu';
  image: string;
  imageAlt: string;
  features: string[];
  benefits: string[];
  integrationNote?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All Projects'>;
  description: string;
  image: string;
  imageAlt: string;
  isFeatured?: boolean;
  demoType: 'Sample Demo' | 'Uploaded Demo';
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  highlights: string[];
  sampleFlow: {
    speaker: 'Customer' | 'Assistant' | 'Workflow';
    message: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface IndustryItem {
  title: string;
  description: string;
  useCase: string;
}
