import { Mail } from 'lucide-react';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';

export function FloatingEmail() {
  const href = buildMailtoUrl(
    `AI Automation Enquiry — ${BUSINESS_CONFIG.businessName}`,
    `Hello ${BUSINESS_CONFIG.businessName},\n\nI would like to enquire about your AI automation services.`
  );

  return (
    <a
      href={href}
      aria-label={`Email ${BUSINESS_CONFIG.businessName} at ${BUSINESS_CONFIG.email}`}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/40 bg-[#172036]/95 px-4 py-3 text-sm font-semibold text-[#F8FAFC] shadow-lg backdrop-blur-md hover:border-[#22D3EE] hover:bg-[#1E2944] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
    >
      <Mail className="w-5 h-5 text-[#22D3EE]" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">Email Us</span>
    </a>
  );
}
