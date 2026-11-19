import { FaqItem, IndustryItem, PortfolioCategory, PortfolioProject, ServiceItem } from '../types';

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_aurora_automation_1795069196991.jpg',
  alt: '3D cinematic visualization of an AI neural network, smartphone messaging interface, voice waveform assistant, and interconnected automation workflow nodes',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'whatsapp-ai',
    number: '01',
    title: 'WhatsApp AI Automation',
    pricingCardTitle: 'WhatsApp AI Automation',
    bookingOption: 'WhatsApp AI Automation',
    shortDescription:
      'Respond to customer questions promptly on WhatsApp, collect structured lead details, and route enquiries to your approved business tools.',
    startingPrice: '₹5,999',
    iconName: 'MessageSquare',
    image: '/src/assets/images/service_whatsapp_ai_1795069196107.jpg',
    imageAlt: 'Dark glassmorphic smartphone interface illustrating automated WhatsApp business customer support flows',
    features: [
      'Automated customer replies',
      'Frequently asked questions',
      'Lead enquiry collection',
      'Customer support workflows',
      'Integration with approved business tools',
    ],
    benefits: [
      'Faster response times for incoming product and service enquiries',
      'Consistent answers to recurring business questions',
      'Organized lead capture ready for follow-up',
    ],
  },
  {
    id: 'telegram-bot',
    number: '02',
    title: 'Telegram AI Bot Development',
    pricingCardTitle: 'Telegram AI Bot',
    bookingOption: 'Telegram AI Bot',
    shortDescription:
      'Interactive Telegram assistants built to answer product enquiries, retain conversation context, and assist customers around the clock.',
    startingPrice: '₹2,999',
    iconName: 'Send',
    image: '/src/assets/images/service_telegram_bot_1795069196994.jpg',
    imageAlt: 'Telegram AI bot assistant floating interface with contextual memory and product enquiry routing',
    features: [
      'Automated Telegram replies',
      'Product and service enquiries',
      'Conversation memory',
      'Customer assistance',
      'Custom business responses',
    ],
    benefits: [
      'Natural multi-turn conversations tailored to your catalog',
      'Remembers customer preferences within ongoing chats',
      'Lightweight channel for instant customer assistance',
    ],
  },
  {
    id: 'email-automation',
    number: '03',
    title: 'Email Automation',
    pricingCardTitle: 'Email Automation',
    bookingOption: 'Email Automation',
    shortDescription:
      'Automate enquiry acknowledgements, structured follow-up sequences, and spreadsheet logging using dependable n8n email workflows.',
    startingPrice: '₹3,999',
    iconName: 'Mail',
    image: '/src/assets/images/service_email_automation_1795069197001.jpg',
    imageAlt: 'Isometric 3D workflow of automated email routing connected to spreadsheet records',
    features: [
      'Automated email notifications',
      'Customer enquiry responses',
      'Email follow-ups',
      'Google Sheets integration',
      'n8n email workflows',
    ],
    benefits: [
      'Every enquiry receives a timely, structured acknowledgement',
      'Automatic logging into Google Sheets eliminates manual copy-paste',
      'Consistent follow-ups that keep prospects informed',
    ],
  },
  {
    id: 'ai-voice-agent',
    number: '04',
    title: 'AI Voice Calling Agents',
    pricingCardTitle: 'AI Voice Agent',
    bookingOption: 'AI Voice Agent',
    shortDescription:
      'Conversational voice workflows that assist callers with business enquiries, gather appointment requests, and escalate to your team when needed.',
    startingPrice: '₹9,999',
    iconName: 'PhoneCall',
    image: '/src/assets/images/service_voice_ai_1795069196469.jpg',
    imageAlt: 'Luminous cyan and violet concentric acoustic waveform representing an AI voice calling assistant',
    features: [
      'AI-powered voice conversations',
      'Customer enquiry assistance',
      'Appointment request collection',
      'Call handling workflows',
      'Human escalation options',
    ],
    benefits: [
      'Structured handling of common phone enquiries and scheduling requests',
      'Seamless handoff options to human team members for complex requests',
      'Captures caller details clearly for timely callbacks',
    ],
    integrationNote:
      'Note: Calling charges, telephony provider fees, user consent requirements, and regional availability depend on the selected integration.',
  },
  {
    id: 'n8n-workflow',
    number: '05',
    title: 'n8n Workflow Automation',
    pricingCardTitle: 'n8n Workflow Automation',
    bookingOption: 'n8n Workflow',
    shortDescription:
      'Connect your everyday spreadsheets, forms, CRM tools, and messaging apps into reliable multi-step workflows tailored to your operations.',
    startingPrice: '₹4,999',
    iconName: 'Workflow',
    image: '/src/assets/images/service_n8n_workflow_1795069196457.jpg',
    imageAlt: 'Isometric node-based automation architecture connecting triggers, webhooks, and output apps',
    features: [
      'Business process automation',
      'Google Sheets workflows',
      'CRM integrations',
      'Webhook integrations',
      'Multi-app workflows',
    ],
    benefits: [
      'Reduces repetitive manual data entry across business tools',
      'Connects web forms, spreadsheets, and notifications in real time',
      'Modular node architecture that adapts as your operations grow',
    ],
  },
  {
    id: 'custom-ai',
    number: '06',
    title: 'Custom AI Business Solutions',
    pricingCardTitle: 'Custom AI Solutions',
    bookingOption: 'Custom AI Solution',
    shortDescription:
      'End-to-end custom AI chatbots, tailored lead management flows, and multi-channel business process integrations designed around your exact workflow.',
    startingPrice: 'Custom Quote',
    isCustomQuote: true,
    iconName: 'Cpu',
    image: '/src/assets/images/service_custom_ai_1795069196865.jpg',
    imageAlt: 'Bespoke modular AI architecture blueprint with tailored business automation pipelines',
    features: [
      'Custom chatbot development',
      'AI workflow design',
      'Business process integrations',
      'Lead management automation',
      'Personalized automation solutions',
    ],
    benefits: [
      'Built specifically around your existing team workflow and tools',
      'Combines messaging, email, spreadsheets, and AI reasoning in one system',
      'Scoped transparently before implementation begins',
    ],
  },
];

export const PRICING_ORDER_IDS = [
  'telegram-bot',
  'email-automation',
  'n8n-workflow',
  'whatsapp-ai',
  'ai-voice-agent',
  'custom-ai',
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All Projects',
  'WhatsApp Automation',
  'Telegram Bots',
  'Email Automation',
  'AI Voice Agents',
  'n8n Workflows',
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'siri-collections-telegram',
    title: 'Siri Collections — Telegram AI Boutique Assistant',
    category: 'Telegram Bots',
    description:
      'A demonstration of an AI-powered Telegram assistant that responds to boutique customer enquiries, supports natural conversations, and remembers conversation context.',
    image: '/src/assets/images/portfolio_siri_collections_1795069196859.jpg',
    imageAlt: 'Smartphone displaying Siri Collections Telegram AI boutique assistant with ethnic wear enquiry cards and conversation memory',
    isFeatured: true,
    demoType: 'Sample Demo',
    highlights: [
      'Remembers size, fabric preference, and budget within the active chat',
      'Handles natural language enquiries for sarees, lehengas, and festive wear',
      'Structured handoff for custom tailoring or store appointment requests',
    ],
    sampleFlow: [
      {
        speaker: 'Customer',
        message: 'Hi, I am looking for a silk saree under ₹12,000 for an upcoming family function.',
      },
      {
        speaker: 'Assistant',
        message: 'I can help with that. Do you prefer lighter pastel shades or traditional festive colours like emerald, maroon, or mustard?',
      },
      {
        speaker: 'Customer',
        message: 'Emerald green, and please include matching blouse stitching options.',
      },
      {
        speaker: 'Assistant',
        message: 'Noted — emerald green silk under ₹12,000 with custom blouse stitching. Here are matching styles from the demo catalog, and I can share your sizing notes with the boutique team.',
      },
    ],
  },
  {
    id: 'whatsapp-clinic-enquiry-demo',
    title: 'Appointment & FAQ Desk — WhatsApp AI Demo',
    category: 'WhatsApp Automation',
    description:
      'Sample demonstration showing how a clinic or coaching centre can answer timing, fee, and location FAQs on WhatsApp while collecting structured callback details.',
    image: '/src/assets/images/service_whatsapp_ai_1795069196107.jpg',
    imageAlt: 'Sample demo of a WhatsApp AI assistant handling enquiry collection',
    demoType: 'Sample Demo',
    highlights: [
      'Instant answers to consultation hours and location questions',
      'Collects name, preferred date, and service topic neatly',
      'Routes enquiry summary to approved staff tracking tools',
    ],
    sampleFlow: [
      {
        speaker: 'Customer',
        message: 'Hello, what are the evening consultation timings and fee structure?',
      },
      {
        speaker: 'Assistant',
        message: 'Evening hours are 5:00 PM to 8:30 PM, Monday to Saturday. Would you like to submit a preferred date and your contact name for a callback?',
      },
      {
        speaker: 'Workflow',
        message: 'Structured enquiry logged for staff review and confirmation.',
      },
    ],
  },
  {
    id: 'email-sheets-intake-demo',
    title: 'Enquiry Acknowledgement & Sheets Sync — Email Demo',
    category: 'Email Automation',
    description:
      'Sample workflow demonstrating automated customer enquiry responses paired with Google Sheets lead logging and scheduled follow-up reminders.',
    image: '/src/assets/images/service_email_automation_1795069197001.jpg',
    imageAlt: 'Sample demo of automated email responses connected to Google Sheets',
    demoType: 'Sample Demo',
    highlights: [
      'Triggers instant enquiry confirmation email from form submissions',
      'Appends lead contact fields cleanly into Google Sheets',
      'Schedules structured follow-up alerts for the business owner',
    ],
    sampleFlow: [
      {
        speaker: 'Customer',
        message: 'Submitted web enquiry form requesting course batch details.',
      },
      {
        speaker: 'Workflow',
        message: 'n8n workflow validates fields, logs row in Google Sheets, and dispatches brochure email.',
      },
      {
        speaker: 'Assistant',
        message: 'Sent structured welcome email with syllabus overview and WhatsApp contact link.',
      },
    ],
  },
  {
    id: 'voice-reception-demo',
    title: 'Inbound Enquiry & Callback Assistant — Voice AI Demo',
    category: 'AI Voice Agents',
    description:
      'Sample demonstration of an AI voice agent answering common inbound questions, gathering appointment request preferences, and escalating urgent calls.',
    image: '/src/assets/images/service_voice_ai_1795069196469.jpg',
    imageAlt: 'Sample demo visualization of an AI voice assistant handling appointment intake',
    demoType: 'Sample Demo',
    highlights: [
      'Polite spoken greeting with natural conversational turn-taking',
      'Collects caller name, purpose, and preferred callback window',
      'Configurable transfer/escalation path to a human representative',
    ],
    sampleFlow: [
      {
        speaker: 'Assistant',
        message: 'Thank you for calling. I can help answer general enquiries or note down an appointment request for our team to confirm.',
      },
      {
        speaker: 'Customer',
        message: 'I would like to check property visit availability for Saturday morning.',
      },
      {
        speaker: 'Workflow',
        message: 'Captures request with consent notice and notifies the human coordinator.',
      },
    ],
  },
  {
    id: 'n8n-multiapp-pipeline-demo',
    title: 'Lead Capture to CRM & Alert Pipeline — n8n Demo',
    category: 'n8n Workflows',
    description:
      'Sample n8n workflow linking website webhooks, Google Sheets, CRM records, and instant team notifications into one automated pipeline.',
    image: '/src/assets/images/service_n8n_workflow_1795069196457.jpg',
    imageAlt: 'Sample demo of a multi-app n8n automation workflow',
    demoType: 'Sample Demo',
    highlights: [
      'Webhook intake with payload normalization and duplicate checks',
      'Synchronizes lead records between Google Sheets and CRM',
      'Dispatches real-time summary alerts via email or messaging',
    ],
    sampleFlow: [
      {
        speaker: 'Workflow',
        message: 'Webhook receives new customer enquiry -> normalizes phone & service interest.',
      },
      {
        speaker: 'Workflow',
        message: 'Updates Google Sheets tracker -> creates CRM contact -> sends team notification.',
      },
    ],
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    title: 'Boutique Owners & Clothing Stores',
    description: 'Handle fabric, sizing, price range, and custom stitching enquiries effortlessly.',
    useCase: 'Telegram & WhatsApp product assistants with contextual memory',
  },
  {
    title: 'Coaching Institutes',
    description: 'Answer batch timings, syllabus, and admission FAQs while capturing student leads.',
    useCase: 'Automated enquiry logging to Google Sheets & follow-up emails',
  },
  {
    title: 'Clinics & Healthcare Practices',
    description: 'Collect appointment requests cleanly and share clinic hours without missed calls.',
    useCase: 'WhatsApp enquiry intake & AI voice request handling',
  },
  {
    title: 'Real Estate Businesses',
    description: 'Qualify buyer or tenant preferences and schedule site visit callbacks automatically.',
    useCase: 'Multi-step n8n CRM & WhatsApp lead routing workflows',
  },
  {
    title: 'Online Sellers',
    description: 'Respond quickly to order status, shipping, and catalog questions across channels.',
    useCase: 'Automated FAQ bots & order notification workflows',
  },
  {
    title: 'Startups & Small Businesses',
    description: 'Connect forms, spreadsheets, inboxes, and messaging tools without manual busywork.',
    useCase: 'Custom n8n pipelines & tailored AI business solutions',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Discovery Consultation',
    description:
      'We discuss your daily customer enquiries, repetitive manual tasks, and the tools your team already uses.',
  },
  {
    step: '02',
    title: 'Workflow & Solution Design',
    description:
      'We map out a practical automation plan covering messaging channels, prompts, data sheets, and human handoffs.',
  },
  {
    step: '03',
    title: 'Build & Integration Testing',
    description:
      'We build and test your chatbot, voice flow, or n8n pipeline thoroughly with realistic business scenarios.',
  },
  {
    step: '04',
    title: 'Launch & Refinement',
    description:
      'Your automation goes live with clear documentation, and we help adjust responses as your business evolves.',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Built for Practical Business Needs',
    description:
      'Every automation focuses on solving real operational bottlenecks like slow enquiry replies and manual data entry.',
  },
  {
    title: 'Transparent Scope & Pricing',
    description:
      'Illustrative starting prices in INR are listed upfront, with third-party hosting, API, and provider fees explained clearly before you begin.',
  },
  {
    title: 'Human-Friendly Escalation',
    description:
      'Automations handle routine questions smoothly while keeping clean pathways for your team to step in whenever needed.',
  },
  {
    title: 'Tailored to Your Tools',
    description:
      'Instead of forcing a rigid platform, we connect WhatsApp, Telegram, Email, Google Sheets, and CRM workflows you already rely on.',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'pricing-fixed',
    question: 'Are the listed starting prices fixed quotes?',
    answer:
      'No. All listed prices in INR are illustrative starting prices to help you budget. Final pricing depends on your workflow complexity, number of integrations, custom features, and conversation volume. We provide a clear scope before starting any work.',
  },
  {
    id: 'extra-costs',
    question: 'Are hosting, AI API usage, and WhatsApp provider fees included?',
    answer:
      'Hosting, AI model API usage, official WhatsApp provider charges, voice calling minutes, telephony fees, and ongoing maintenance are separate from setup fees and depend on your chosen providers and usage.',
  },
  {
    id: 'whatsapp-booking',
    question: 'How does booking a free consultation work?',
    answer:
      'Complete the consultation form on the Book Appointment page and click "Send Request via Email". This prepares a formatted enquiry email addressed to suneethapammi64@gmail.com. You simply press Send in your email app, and our team will confirm your requested date and time.',
  },
  {
    id: 'voice-requirements',
    question: 'What is needed for AI Voice Calling Agents?',
    answer:
      'AI voice calling setups depend on telephony provider integration, per-minute voice and calling charges, customer consent requirements, and regional availability. We review all of these details with you during your consultation.',
  },
  {
    id: 'small-business',
    question: 'Can small businesses or single-store boutiques use AI automation?',
    answer:
      'Yes. Lightweight workflows such as a Telegram AI assistant or an Email-to-Google Sheets automation are designed specifically so boutiques, clinics, coaching institutes, and online sellers can start simply without unnecessary complexity.',
  },
];
