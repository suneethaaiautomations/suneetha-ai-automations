export const BUSINESS_CONFIG = {
  businessName: 'Suneetha AI Automations',
  displayName: 'SUNEETHA AI',
  secondaryBrandText: 'AUTOMATIONS',
  tagline: 'Automate Smarter. Grow Faster.',
  location: 'India',
  currency: 'INR',
  email: 'suneethapammi64@gmail.com',
  whatsappNumber :'919515436686',
} as const;

export function buildMailtoUrl(subject: string, body: string): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${BUSINESS_CONFIG.email}?subject=${encodedSubject}&body=${encodedBody}`;
}
