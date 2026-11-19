import { Check, Info, Mail } from 'lucide-react';
import { ServiceIcon } from '../components/ServiceIcon';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { PRICING_ORDER_IDS, SERVICES } from '../data/agencyData';
import { PageId, ServiceItem, ServiceOptionLabel } from '../types';

interface PricingPageProps {
  onNavigate: (page: PageId, preselectedService?: ServiceOptionLabel) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const orderedServices = PRICING_ORDER_IDS.map((id) =>
    SERVICES.find((service) => service.id === id)
  ).filter((item): item is ServiceItem => Boolean(item));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
          Pricing in INR (₹)
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-5xl">
          Transparent Illustrative Starting Prices
        </h1>
        <p className="text-base leading-relaxed text-[#CBD5E1]">
          Choose a starting point that fits your current business workflow, or book a consultation
          to scope a custom automation setup.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orderedServices.map((service) => {
          const emailUrl = buildMailtoUrl(
            `Pricing Enquiry: ${service.pricingCardTitle} (${service.startingPrice})`,
            `Hello ${BUSINESS_CONFIG.businessName},\n\nI am interested in ${service.pricingCardTitle} (${service.startingPrice}) and would like to discuss my requirements.`
          );

          return (
            <article
              key={service.id}
              className="aurora-glass flex flex-col justify-between rounded-2xl border border-white/10 p-6 sm:p-7 hover:border-[#8B5CF6]/55 transition-colors duration-150"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
                    {service.pricingCardTitle}
                  </h2>
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-[#080B18]/75 flex items-center justify-center text-[#22D3EE] shrink-0">
                    <ServiceIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                </div>

                <div className="border-b border-white/10 pb-5">
                  <span className="block text-xs text-[#CBD5E1]/80 mb-1">
                    {service.isCustomQuote ? 'Tailored Scope' : 'Starting at'}
                  </span>
                  <p className="font-display text-3xl font-bold tabular-nums text-[#F8FAFC]">
                    {service.isCustomQuote ? 'Request a Quote' : service.startingPrice}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#CBD5E1]">Included Scope Areas</p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                        <Check
                          className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.integrationNote && (
                  <p className="text-xs leading-relaxed text-[#CBD5E1]/90 rounded-xl border border-white/10 bg-[#080B18]/65 p-3">
                    {service.integrationNote}
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onNavigate('book', service.bookingOption)}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-4 py-3 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  Get Started
                </button>
                <a
                  href={emailUrl}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#080B18]/70 px-4 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors duration-150 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
                  <span>Discuss via Email</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#172036]/55 p-6 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1.5 text-sm leading-relaxed text-[#CBD5E1]">
          <p className="font-semibold text-[#F8FAFC]">Important Pricing Information</p>
          <p>
            All displayed figures are illustrative starting prices and do not constitute fixed
            quotes. Third-party costs such as cloud hosting, AI model API usage, official WhatsApp
            Business provider fees, voice telephony minutes, and optional ongoing maintenance are
            billed separately based on your selected tools and usage volume.
          </p>
        </div>
      </div>
    </div>
  );
}
