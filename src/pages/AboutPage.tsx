import { ArrowRight, Check, Mail } from 'lucide-react';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { SERVICES } from '../data/agencyData';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

const APPROACH_ITEMS = [
  {
    number: '01',
    title: 'Listen First',
    description:
      'We start by understanding your business type, customer enquiry channels, and daily manual bottlenecks before proposing any tools.',
  },
  {
    number: '02',
    title: 'Keep Workflows Practical',
    description:
      'We focus on automations that save measurable time right away — answering common questions, logging leads cleanly, and routing follow-ups.',
  },
  {
    number: '03',
    title: 'Clear Human Oversight',
    description:
      'Customers should always have an easy path to reach a real person when a request requires personal attention or confirmation.',
  },
];

const WHY_WORK_WITH_US = [
  'Focused exclusively on practical AI chatbots, voice assistants, and workflow automation',
  'Solutions tailored for Indian small businesses, boutiques, institutes, clinics, and online sellers',
  'Transparent INR starting rates with clear communication about external provider costs',
  'Clean integration with familiar tools like WhatsApp, Telegram, Email, and Google Sheets',
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  const emailUrl = buildMailtoUrl(
    `AI Automation Enquiry — ${BUSINESS_CONFIG.businessName}`,
    `Hello ${BUSINESS_CONFIG.businessName},\n\nI would like to learn more about working together on AI automation.`
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 space-y-16">
      {/* Intro */}
      <header className="max-w-3xl space-y-5">
        <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
          About {BUSINESS_CONFIG.businessName}
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-5xl">
          Meet Suneetha AI Automations
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-[#CBD5E1]">
          Suneetha AI Automations helps businesses simplify everyday operations through intelligent
          automation. We create practical AI solutions for customer communication, enquiry
          management, workflow automation, and business productivity.
        </p>
      </header>

      {/* Our Mission */}
      <section className="aurora-glass rounded-2xl border border-[#8B5CF6]/35 p-8 sm:p-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">Our Mission</p>
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC] text-balance sm:text-3xl">
            &ldquo;To make AI automation accessible, practical, and valuable for businesses of all
            sizes.&rdquo;
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] pt-1">
            Based in {BUSINESS_CONFIG.location}, we work with boutique owners, clothing stores,
            coaching institutes, clinics, real estate teams, online sellers, and startups to turn
            repetitive messaging and data tasks into reliable automated workflows.
          </p>
        </div>
      </section>

      {/* Our Services Summary */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">Our Services</p>
            <h2 className="font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
              What We Build
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#22D3EE] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-white/10 bg-[#172036]/55 p-6 space-y-2.5"
            >
              <span className="text-xs font-mono tabular-nums text-[#8B5CF6]">
                {service.number}.
              </span>
              <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{service.title}</h3>
              <p className="text-sm leading-relaxed text-[#CBD5E1]">{service.shortDescription}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">Our Approach</p>
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
            How We Design Every Automation
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {APPROACH_ITEMS.map((item) => (
            <div
              key={item.number}
              className="aurora-glass rounded-2xl border border-white/10 p-6 space-y-3"
            >
              <span className="text-xs font-mono tabular-nums text-[#22D3EE]">
                {item.number}.
              </span>
              <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#CBD5E1]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Work With Us? */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center rounded-2xl border border-white/10 bg-[#172036]/50 p-6 sm:p-10">
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
            Why Work With Us?
          </p>
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
            Straightforward Collaboration Without Jargon
          </h2>
          <p className="text-sm leading-relaxed text-[#CBD5E1]">
            We explain every step clearly in simple English so you always understand what your
            automation does, what tools it uses, and what it costs.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {WHY_WORK_WITH_US.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#080B18]/65 p-4"
            >
              <Check className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-[#F8FAFC]">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Call to Action */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#172036] to-[#0E1426] p-8 sm:p-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 max-w-xl">
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
            Have a Workflow You Want to Automate?
          </h2>
          <p className="text-sm leading-relaxed text-[#CBD5E1]">
            Schedule a free consultation request or email us directly at {BUSINESS_CONFIG.email} to
            talk through your business requirements.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap cursor-pointer"
          >
            Book Free Consultation
          </button>
          <a
            href={emailUrl}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#080B18]/75 px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE] transition-colors duration-150 whitespace-nowrap"
          >
            <Mail className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
            <span>Contact via Email</span>
          </a>
        </div>
      </section>
    </div>
  );
}
