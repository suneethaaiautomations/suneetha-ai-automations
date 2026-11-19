import { FormEvent, useState } from 'react';
import { Calendar, Check, Copy, Mail, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [topic, setTopic] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [preparedLink, setPreparedLink] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const directEmailUrl = buildMailtoUrl(
    `AI Automation Enquiry — ${BUSINESS_CONFIG.businessName}`,
    `Hello ${BUSINESS_CONFIG.businessName},\n\nI would like to get in touch regarding AI automation.`
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_CONFIG.email);
      setEmailCopied(true);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) {
      setError('Please fill in your name, contact detail, and message.');
      return;
    }

    setError('');
    const subject = `${topic} — ${name.trim()}`;
    const formatted = [
      `Hello ${BUSINESS_CONFIG.businessName},`,
      '',
      `Name: ${name.trim()}`,
      `Contact: ${contactInfo.trim()}`,
      `Topic: ${topic}`,
      `Message: ${message.trim()}`,
    ].join('\n');

    const url = buildMailtoUrl(subject, formatted);
    setPreparedLink(url);

    const anchor = document.createElement('a');
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">Contact Us</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-5xl">
          Get in Touch with Suneetha AI Automations
        </h1>
        <p className="text-base leading-relaxed text-[#CBD5E1]">
          Send us an email directly at {BUSINESS_CONFIG.email} or schedule a free consultation to
          explore AI automation for your business.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="aurora-glass rounded-2xl border border-white/10 p-6 space-y-5">
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">Direct Contact</h2>

            <div className="space-y-4 text-sm text-[#CBD5E1]">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-2">
                  <p className="font-semibold text-[#F8FAFC]">Email Enquiry</p>
                  <p>Reach us directly by email to discuss automation workflows and project scope.</p>
                  <a
                    href={directEmailUrl}
                    className="block font-medium text-[#22D3EE] hover:underline break-all"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={directEmailUrl}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#172036] border border-[#22D3EE]/35 px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] hover:border-[#22D3EE] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#22D3EE]" aria-hidden="true" />
                      <span>Compose Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#080B18]/70 px-3.5 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                    >
                      {emailCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#22D3EE]" aria-hidden="true" />
                          <span>Email Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-white/10">
                <MapPin className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-semibold text-[#F8FAFC]">Location</p>
                  <p>{BUSINESS_CONFIG.location} · Serving businesses nationwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#8B5CF6]/30 bg-[#172036]/55 p-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-[#F8FAFC]">
              Prefer a Scheduled Consultation?
            </h2>
            <p className="text-sm leading-relaxed text-[#CBD5E1]">
              Use our consultation booking form to share your business type, preferred date, and
              time slot.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 cursor-pointer"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="aurora-glass rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5"
          >
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-[#F8FAFC]">Send a Quick Enquiry</h2>
              <p className="text-sm text-[#CBD5E1]">
                Formats your enquiry and opens your email client addressed to{' '}
                {BUSINESS_CONFIG.email}.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#F8FAFC]">
                  Your Name <span className="text-[#22D3EE]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-info" className="block text-sm font-medium text-[#F8FAFC]">
                  Email or Phone <span className="text-[#22D3EE]">*</span>
                </label>
                <input
                  id="contact-info"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Your email address or phone number"
                  className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-topic" className="block text-sm font-medium text-[#F8FAFC]">
                Topic
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#22D3EE] focus:outline-none"
              >
                <option value="General Enquiry" className="bg-[#080B18]">
                  General Enquiry
                </option>
                <option value="WhatsApp AI Automation" className="bg-[#080B18]">
                  WhatsApp AI Automation
                </option>
                <option value="Telegram AI Bot" className="bg-[#080B18]">
                  Telegram AI Bot
                </option>
                <option value="Email Automation" className="bg-[#080B18]">
                  Email Automation
                </option>
                <option value="AI Voice Calling Agents" className="bg-[#080B18]">
                  AI Voice Calling Agents
                </option>
                <option value="n8n Workflow Automation" className="bg-[#080B18]">
                  n8n Workflow Automation
                </option>
                <option value="Custom AI Solution" className="bg-[#080B18]">
                  Custom AI Solution
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-sm font-medium text-[#F8FAFC]">
                Message <span className="text-[#22D3EE]">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help automate your business?"
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs text-rose-400">
                {error}
              </p>
            )}

            {preparedLink && (
              <div className="rounded-xl border border-[#22D3EE]/35 bg-[#080B18]/80 p-4 text-xs leading-relaxed text-[#CBD5E1] space-y-2">
                <p>
                  Your email draft is ready for{' '}
                  <strong className="text-[#F8FAFC]">{BUSINESS_CONFIG.email}</strong>. Please press{' '}
                  <strong className="text-[#F8FAFC]">Send</strong> in your email app to submit it.
                </p>
                <a
                  href={preparedLink}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#22D3EE] hover:underline"
                >
                  <span>Open Email Draft</span>
                </a>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-6 py-3 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 cursor-pointer"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Send Enquiry via Email</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
