import { Check, Info, Mail } from 'lucide-react';
import { MediaImage } from '../components/MediaImage';
import { ServiceIcon } from '../components/ServiceIcon';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { SERVICES } from '../data/agencyData';
import { PageId, ServiceOptionLabel } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageId, preselectedService?: ServiceOptionLabel) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 space-y-14">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
          AI &amp; Workflow Services
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-5xl">
          Practical AI Automation Services Built for Daily Operations
        </h1>
        <p className="text-base leading-relaxed text-[#CBD5E1]">
          Explore our six core automation services below. Every solution is tailored around your
          business tools, customer channels, and workflow requirements.
        </p>
      </header>

      <div className="rounded-2xl border border-[#22D3EE]/25 bg-[#172036]/60 p-5 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-[#CBD5E1]">
          <strong className="font-semibold text-[#F8FAFC]">Pricing &amp; Usage Transparency:</strong>{' '}
          All prices listed below are illustrative starting prices in INR, not guaranteed fixed
          quotes. Hosting, AI API usage, official WhatsApp provider charges, voice calling minutes,
          and ongoing maintenance may cost extra depending on your setup.
        </p>
      </div>

      <div className="space-y-12">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 1;
          const emailUrl = buildMailtoUrl(
            `Service Enquiry: ${service.title} (${service.startingPrice})`,
            `Hello ${BUSINESS_CONFIG.businessName},\n\nI would like to enquire about ${service.title} (starting price: ${service.startingPrice}).`
          );

          return (
            <section
              key={service.id}
              className="aurora-glass rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="rounded-xl border border-white/10 bg-[#080B18]/75 p-2">
                    <MediaImage
                      src={service.image}
                      alt={service.imageAlt}
                      fallbackTitle={service.title}
                      aspectClassName="aspect-[4/3]"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl border border-[#8B5CF6]/35 bg-[#080B18]/80 flex items-center justify-center text-[#22D3EE]">
                        <ServiceIcon name={service.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-mono tabular-nums text-[#22D3EE]">
                          Service {service.number}
                        </span>
                        <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="block text-xs text-[#CBD5E1]/80">
                        {service.isCustomQuote ? 'Pricing Model' : 'Illustrative Starting Price'}
                      </span>
                      <span className="font-display text-2xl font-bold tabular-nums text-[#F8FAFC]">
                        {service.startingPrice}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                    {service.shortDescription}
                  </p>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2 border-t border-white/10">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-[#F8FAFC]">Key Features</h3>
                      <ul className="space-y-2">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                            <Check
                              className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-[#F8FAFC]">Business Benefits</h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2 text-sm text-[#CBD5E1]"
                          >
                            <Check
                              className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {service.integrationNote && (
                    <p className="rounded-xl border border-white/10 bg-[#080B18]/70 px-4 py-3 text-xs leading-relaxed text-[#CBD5E1]">
                      {service.integrationNote}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={emailUrl}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Enquire via Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onNavigate('book', service.bookingOption)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#080B18]/65 px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
