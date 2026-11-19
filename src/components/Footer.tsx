import { Mail, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

const FOOTER_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About Us' },
  { id: 'book', label: 'Book Appointment' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ onNavigate }: FooterProps) {
  const emailHref = buildMailtoUrl(
    `AI Automation Enquiry — ${BUSINESS_CONFIG.businessName}`,
    `Hello ${BUSINESS_CONFIG.businessName},\n\nI would like to learn more about your AI automation services.`
  );

  return (
    <footer className="border-t border-white/10 bg-[#060913]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-4">
            <div>
              <p className="font-display text-xl font-bold tracking-tight text-[#F8FAFC]">
                {BUSINESS_CONFIG.displayName}
              </p>
              <p className="text-xs font-medium tracking-[0.22em] text-[#22D3EE]">
                {BUSINESS_CONFIG.secondaryBrandText}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[#CBD5E1] max-w-sm">
              {BUSINESS_CONFIG.tagline} Practical WhatsApp chatbots, Telegram AI assistants, Email
              Automation, AI Voice Agents, and custom n8n workflows for growing businesses.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#CBD5E1]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" aria-hidden="true" />
                {BUSINESS_CONFIG.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>Currency: {BUSINESS_CONFIG.currency} (₹)</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-[#F8FAFC]">Navigation</h2>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 md:grid-cols-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-[#CBD5E1] hover:text-[#22D3EE] transition-colors duration-150 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h2 className="text-sm font-semibold text-[#F8FAFC]">Direct Contact</h2>
            <div className="space-y-3 text-sm text-[#CBD5E1]">
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="flex items-center gap-2.5 hover:text-[#22D3EE] transition-colors duration-150"
              >
                <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0" aria-hidden="true" />
                <span className="break-all">{BUSINESS_CONFIG.email}</span>
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center gap-2.5 rounded-xl border border-[#22D3EE]/30 bg-[#172036]/80 px-4 py-2.5 text-sm font-medium text-[#F8FAFC] hover:border-[#22D3EE] transition-colors duration-150"
              >
                <Mail className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
                <span>Send Email Enquiry</span>
              </a>
            </div>
            <p className="text-xs leading-relaxed text-[#CBD5E1]/80">
              All prices listed on this website are illustrative starting prices in INR. Third-party
              hosting, API usage, WhatsApp provider charges, voice calling minutes, and ongoing
              maintenance are separate.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#CBD5E1]/80">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.businessName}. All rights reserved.
          </p>
          <p>Built for practical business automation in India.</p>
        </div>
      </div>
    </footer>
  );
}
