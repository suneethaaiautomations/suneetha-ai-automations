import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Mail } from 'lucide-react';
import { AuroraCanvas } from '../components/AuroraCanvas';
import { MediaImage } from '../components/MediaImage';
import { ServiceIcon } from '../components/ServiceIcon';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import {
  FAQS,
  HERO_MEDIA,
  INDUSTRIES,
  PORTFOLIO_PROJECTS,
  SERVICES,
  WHY_CHOOSE_ITEMS,
  WORKFLOW_STEPS,
} from '../data/agencyData';
import { PageId, ServiceOptionLabel } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId, preselectedService?: ServiceOptionLabel) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id ?? null);
  const featuredProject = PORTFOLIO_PROJECTS[0];

  const finalEmailUrl = buildMailtoUrl(
    `AI Automation Enquiry — ${BUSINESS_CONFIG.businessName}`,
    `Hello ${BUSINESS_CONFIG.businessName},\n\nI visited your website and would like to discuss AI automation for my business.`
  );

  return (
    <div className="relative">
      {/* 1. Cinematic Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 aurora-ambient-bg">
        <AuroraCanvas />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-medium tracking-[0.18em] text-[#22D3EE]">
                {BUSINESS_CONFIG.displayName} {BUSINESS_CONFIG.secondaryBrandText} ·{' '}
                {BUSINESS_CONFIG.tagline}
              </p>

              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#F8FAFC] text-balance sm:text-5xl lg:text-[3.5rem]">
                Your Business. Powered by Intelligent AI Automation.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
                Transform your business with smart WhatsApp chatbots, Telegram AI assistants, Email
                Automation, AI Voice Agents, and custom n8n workflows.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] shadow-lg shadow-[#8B5CF6]/20 hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] cursor-pointer"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#172036]/70 px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE]/60 hover:bg-[#172036] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] cursor-pointer"
                >
                  Explore Our Services
                </button>
              </div>

              <div className="pt-2 text-xs text-[#CBD5E1]/90 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>India-Based Automation Studio</span>
                <span aria-hidden="true">·</span>
                <span>WhatsApp, Telegram, Email, Voice &amp; n8n</span>
                <span aria-hidden="true">·</span>
                <span>Transparent INR Starting Rates</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-white/12 bg-[#172036]/60 p-2 shadow-2xl shadow-[#000000]/50">
                <MediaImage
                  src={HERO_MEDIA.image}
                  alt={HERO_MEDIA.alt}
                  fallbackTitle="Intelligent AI Automation Ecosystem"
                  aspectClassName="aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our AI Automation Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
              Core Capabilities
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-4xl">
              Our AI Automation Services
            </h2>
            <p className="text-base leading-relaxed text-[#CBD5E1]">
              Practical automation systems designed to handle everyday customer communication,
              enquiry capture, and multi-app workflows reliably.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#22D3EE] hover:text-[#F8FAFC] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View Full Service Details</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="aurora-glass group flex flex-col justify-between rounded-2xl border border-white/10 p-6 hover:border-[#8B5CF6]/50 transition-colors duration-150"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium font-mono tabular-nums text-[#22D3EE]">
                    {service.number}.
                  </span>
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-[#080B18]/70 flex items-center justify-center text-[#8B5CF6] group-hover:text-[#22D3EE] transition-colors duration-150">
                    <ServiceIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#CBD5E1]">
                    {service.shortDescription}
                  </p>
                </div>

                <ul className="space-y-2 pt-1">
                  {service.features.slice(0, 3).map((feature) => (
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

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-xs text-[#CBD5E1]/80">
                    {service.isCustomQuote ? 'Pricing' : 'Illustrative Starting Price'}
                  </span>
                  <span className="font-display text-lg font-bold tabular-nums text-[#F8FAFC]">
                    {service.startingPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('book', service.bookingOption)}
                  className="rounded-xl border border-white/15 bg-[#080B18]/60 px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#CBD5E1]/80">
          All listed prices are illustrative starting prices in INR, not fixed quotes. Hosting, API
          usage, WhatsApp provider charges, voice minutes, and maintenance may cost extra.
        </p>
      </section>

      {/* 3. Why Choose Suneetha AI Automations? */}
      <section className="border-y border-white/10 bg-[#0B1022]/80">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
                Practical Approach
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance">
                Why Choose Suneetha AI Automations?
              </h2>
              <p className="text-sm leading-relaxed text-[#CBD5E1]">
                We focus on clear, dependable automation tailored to how Indian businesses actually
                communicate with their customers.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#172036]/55 p-6 space-y-2.5"
                >
                  <span className="text-xs font-mono tabular-nums text-[#8B5CF6]">
                    0{idx + 1}.
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#CBD5E1]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How Our Automation Works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">Process</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-4xl">
            How Our Automation Works
          </h2>
          <p className="text-base text-[#CBD5E1]">
            A straightforward four-stage workflow from initial discovery to live deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="aurora-glass rounded-2xl border border-white/10 p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <span className="inline-block font-mono text-sm font-medium tabular-nums text-[#22D3EE]">
                  Step {item.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#CBD5E1]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="border-y border-white/10 bg-[#0B1022]/80">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">Who We Help</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="text-base text-[#CBD5E1]">
              Designed for customer-facing businesses looking to simplify enquiries, follow-ups, and
              daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.title}
                className="rounded-2xl border border-white/10 bg-[#172036]/50 p-6 space-y-3 hover:border-[#22D3EE]/40 transition-colors duration-150"
              >
                <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#CBD5E1]">{industry.description}</p>
                <p className="pt-2 border-t border-white/10 text-xs text-[#22D3EE]">
                  {industry.useCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Automation Demo */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="aurora-glass rounded-2xl border border-white/12 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs text-[#22D3EE] flex items-center gap-2">
                <span>Featured Automation Demo</span>
                <span aria-hidden="true">·</span>
                <span>{featuredProject.demoType}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredProject.category}</span>
              </div>

              <h2 className="font-display text-2xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-3xl">
                {featuredProject.title}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                {featuredProject.description}
              </p>

              <div className="space-y-3 rounded-xl border border-white/10 bg-[#080B18]/75 p-4">
                <p className="text-xs font-medium text-[#CBD5E1]">
                  Sample Conversation Walkthrough
                </p>
                <div className="space-y-2.5">
                  {featuredProject.sampleFlow.slice(0, 3).map((turn, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
                        turn.speaker === 'Customer'
                          ? 'bg-[#172036] text-[#F8FAFC] border border-white/10'
                          : 'bg-[#8B5CF6]/15 text-[#F8FAFC] border border-[#8B5CF6]/30'
                      }`}
                    >
                      <span className="font-semibold text-[#22D3EE] mr-1.5">{turn.speaker}:</span>
                      <span>{turn.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Portfolio Gallery</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('book', 'Telegram AI Bot')}
                  className="text-sm font-semibold text-[#CBD5E1] hover:text-[#22D3EE] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request Similar Demo
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-[#080B18]/70 p-2">
                <MediaImage
                  src={featuredProject.image}
                  alt={featuredProject.imageAlt}
                  fallbackTitle={featuredProject.title}
                  aspectClassName="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="border-t border-white/10 bg-[#0B1022]/60">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-10 text-center">
            <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
              Clear Expectations
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#172036]/45">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="px-6 py-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-2 text-left text-base font-medium text-[#F8FAFC] hover:text-[#22D3EE] transition-colors duration-150 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#CBD5E1] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#22D3EE]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="pt-2 pb-2 text-sm leading-relaxed text-[#CBD5E1]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Final Email Call to Action */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#8B5CF6]/35 bg-gradient-to-br from-[#172036] via-[#111930] to-[#080B18] p-8 sm:p-12 text-center">
          <div className="mx-auto max-w-2xl space-y-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-4xl">
              Ready to Automate Your Business Workflows?
            </h2>
            <p className="text-base leading-relaxed text-[#CBD5E1]">
              Share your business requirements for a free consultation, or send us an email directly
              at {BUSINESS_CONFIG.email} to discuss the right AI solution.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={finalEmailUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#0891B2] px-6 py-3.5 text-sm font-semibold text-[#080B18] hover:from-[#38BDF8] hover:to-[#06B6D4] transition-all duration-150 whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email Us Directly</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#080B18]/70 px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] hover:border-[#8B5CF6] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
