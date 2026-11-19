import { FormEvent, useEffect, useState } from 'react';
import { Calendar, Check, Copy, ExternalLink, Info, Mail } from 'lucide-react';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { ServiceOptionLabel } from '../types';

interface BookAppointmentPageProps {
  preselectedService?: ServiceOptionLabel;
}

const BUSINESS_TYPES = [
  'Boutique / Clothing Store',
  'Coaching Institute',
  'Clinic',
  'Real Estate',
  'E-commerce',
  'Other Business',
] as const;

const SERVICE_OPTIONS: ServiceOptionLabel[] = [
  'WhatsApp AI Automation',
  'Telegram AI Bot',
  'Email Automation',
  'AI Voice Agent',
  'n8n Workflow',
  'Custom AI Solution',
];

const TIME_SLOTS = [
  '10:00 AM – 11:00 AM IST',
  '11:30 AM – 12:30 PM IST',
  '02:00 PM – 03:00 PM IST',
  '04:00 PM – 05:00 PM IST',
  '06:00 PM – 07:00 PM IST',
  '07:30 PM – 08:30 PM IST',
] as const;

interface FormValues {
  fullName: string;
  businessName: string;
  phoneNumber: string;
  email: string;
  businessType: string;
  serviceInterestedIn: string;
  preferredDate: string;
  preferredTime: string;
  requirements: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

function getTodayLocalIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function BookAppointmentPage({ preselectedService }: BookAppointmentPageProps) {
  const todayIso = getTodayLocalIso();

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    businessName: '',
    phoneNumber: '',
    email: '',
    businessType: '',
    serviceInterestedIn: preselectedService ?? '',
    preferredDate: '',
    preferredTime: '',
    requirements: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedMailtoUrl, setPreparedMailtoUrl] = useState<string | null>(null);
  const [preparedMessage, setPreparedMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setValues((prev) => ({ ...prev, serviceInterestedIn: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnly = values.phoneNumber.replace(/[\s\-+()]/g, '');
    if (!digitsOnly) {
      nextErrors.phoneNumber = 'Please enter your contact phone number.';
    } else if (!/^\d{10,15}$/.test(digitsOnly)) {
      nextErrors.phoneNumber = 'Please enter a valid 10 to 15 digit phone number.';
    }

    if (values.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email.trim())) {
        nextErrors.email = 'Please enter a valid email address or leave this field blank.';
      }
    }

    if (!values.businessType) {
      nextErrors.businessType = 'Please select your business type.';
    }

    if (!values.serviceInterestedIn) {
      nextErrors.serviceInterestedIn = 'Please select the service you are interested in.';
    }

    if (!values.preferredDate) {
      nextErrors.preferredDate = 'Please select a preferred consultation date.';
    } else if (values.preferredDate < todayIso) {
      nextErrors.preferredDate =
        'Consultation date cannot be in the past. Please choose today or a future date.';
    }

    if (!values.preferredTime) {
      nextErrors.preferredTime = 'Please select a preferred consultation time.';
    }

    if (!values.consent) {
      nextErrors.consent =
        'Please confirm consent so we can prepare your consultation enquiry email.';
    }

    return nextErrors;
  };

  const buildConsultationBody = (): string => {
    const lines = [
      `Hello ${BUSINESS_CONFIG.businessName},`,
      '',
      'I would like to request a free AI automation consultation.',
      '',
      `Full Name: ${values.fullName.trim()}`,
      `Business Name: ${values.businessName.trim() || 'Not provided'}`,
      `Phone Number: ${values.phoneNumber.trim()}`,
      `Email Address: ${values.email.trim() || 'Not provided'}`,
      `Business Type: ${values.businessType}`,
      `Service Interested In: ${values.serviceInterestedIn}`,
      `Preferred Date: ${values.preferredDate}`,
      `Preferred Time: ${values.preferredTime}`,
      `Business Requirements: ${values.requirements.trim() || 'Will discuss during consultation'}`,
      '',
      'I understand that this consultation request and the preferred date/time are subject to confirmation.',
    ];
    return lines.join('\n');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const subject = `Free AI Automation Consultation Request — ${values.fullName.trim()}`;
    const body = buildConsultationBody();
    const mailtoUrl = buildMailtoUrl(subject, body);

    setPreparedMessage(body);
    setPreparedMailtoUrl(mailtoUrl);
    setCopied(false);

    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopyMessage = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
          Free Consultation Request
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-5xl">
          Book Your Free AI Automation Consultation
        </h1>
        <p className="text-base leading-relaxed text-[#CBD5E1]">
          Tell us about your business, and let&apos;s explore the right AI automation solution for
          you.
        </p>
      </header>

      <div className="rounded-2xl border border-[#22D3EE]/25 bg-[#172036]/55 p-5 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-[#CBD5E1]">
          Submitting this form prepares a formatted enquiry email addressed to{' '}
          <strong className="font-semibold text-[#F8FAFC]">{BUSINESS_CONFIG.email}</strong>. You
          must press <strong className="font-semibold text-[#F8FAFC]">Send</strong> inside your
          email app to submit your request, and your requested date and time remain subject to
          confirmation.
        </p>
      </div>

      {preparedMailtoUrl ? (
        <section
          aria-live="polite"
          className="aurora-glass rounded-2xl border border-[#22D3EE]/45 p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-[0.14em] text-[#22D3EE]">
              Email Enquiry Prepared · Subject to Confirmation
            </p>
            <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
              One Final Step: Press Send in Your Email App
            </h2>
            <p className="text-sm leading-relaxed text-[#CBD5E1]">
              Your appointment is <strong className="text-[#F8FAFC]">not confirmed yet</strong>.
              Please send the prepared email to{' '}
              <strong className="text-[#F8FAFC]">{BUSINESS_CONFIG.email}</strong>. Our team will
              review your requested date and time and confirm availability via email.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#080B18]/80 p-4 space-y-2">
            <p className="text-xs font-medium text-[#CBD5E1]">
              Prepared Email Body (To: {BUSINESS_CONFIG.email})
            </p>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-[#F8FAFC]">
              {preparedMessage}
            </pre>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={preparedMailtoUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#0891B2] px-6 py-3.5 text-sm font-semibold text-[#080B18] hover:from-[#38BDF8] hover:to-[#06B6D4] transition-all duration-150 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Open Email &amp; Press Send</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#172036] px-5 py-3.5 text-sm font-semibold text-[#F8FAFC] hover:border-[#8B5CF6] transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
                  <span>Message Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copy Message</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setPreparedMailtoUrl(null)}
              className="text-sm font-medium text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="aurora-glass rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 1. Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#F8FAFC]">
                Full Name <span className="text-[#22D3EE]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={values.fullName}
                onChange={(e) => setValues({ ...values, fullName: e.target.value })}
                aria-invalid={Boolean(errors.fullName)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* 2. Business Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-[#F8FAFC]">
                Business Name <span className="text-xs text-[#CBD5E1]/70">(Optional)</span>
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={values.businessName}
                onChange={(e) => setValues({ ...values, businessName: e.target.value })}
                placeholder="e.g., Siri Collections"
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
              />
            </div>

            {/* 3. Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#F8FAFC]">
                Phone Number <span className="text-[#22D3EE]">*</span>
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={values.phoneNumber}
                onChange={(e) => setValues({ ...values, phoneNumber: e.target.value })}
                aria-invalid={Boolean(errors.phoneNumber)}
                placeholder="e.g., +91 98765 43210"
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
              />
              {errors.phoneNumber && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* 4. Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#F8FAFC]">
                Email Address <span className="text-xs text-[#CBD5E1]/70">(Optional)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                aria-invalid={Boolean(errors.email)}
                placeholder="name@business.com"
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
              />
              {errors.email && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 5. Business Type */}
            <div className="space-y-2">
              <label htmlFor="businessType" className="block text-sm font-medium text-[#F8FAFC]">
                Business Type <span className="text-[#22D3EE]">*</span>
              </label>
              <select
                id="businessType"
                name="businessType"
                required
                value={values.businessType}
                onChange={(e) => setValues({ ...values, businessType: e.target.value })}
                aria-invalid={Boolean(errors.businessType)}
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#22D3EE] focus:outline-none"
              >
                <option value="" className="bg-[#080B18]">
                  Select your business type
                </option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#080B18]">
                    {type}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.businessType}
                </p>
              )}
            </div>

            {/* 6. Service Interested In */}
            <div className="space-y-2">
              <label
                htmlFor="serviceInterestedIn"
                className="block text-sm font-medium text-[#F8FAFC]"
              >
                Service Interested In <span className="text-[#22D3EE]">*</span>
              </label>
              <select
                id="serviceInterestedIn"
                name="serviceInterestedIn"
                required
                value={values.serviceInterestedIn}
                onChange={(e) => setValues({ ...values, serviceInterestedIn: e.target.value })}
                aria-invalid={Boolean(errors.serviceInterestedIn)}
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#22D3EE] focus:outline-none"
              >
                <option value="" className="bg-[#080B18]">
                  Select an AI automation service
                </option>
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service} value={service} className="bg-[#080B18]">
                    {service}
                  </option>
                ))}
              </select>
              {errors.serviceInterestedIn && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.serviceInterestedIn}
                </p>
              )}
            </div>

            {/* 7. Preferred Consultation Date */}
            <div className="space-y-2">
              <label htmlFor="preferredDate" className="block text-sm font-medium text-[#F8FAFC]">
                Preferred Consultation Date <span className="text-[#22D3EE]">*</span>
              </label>
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                min={todayIso}
                required
                value={values.preferredDate}
                onChange={(e) => setValues({ ...values, preferredDate: e.target.value })}
                aria-invalid={Boolean(errors.preferredDate)}
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#22D3EE] focus:outline-none"
              />
              {errors.preferredDate && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            {/* 8. Preferred Time */}
            <div className="space-y-2">
              <label htmlFor="preferredTime" className="block text-sm font-medium text-[#F8FAFC]">
                Preferred Time <span className="text-[#22D3EE]">*</span>
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                required
                value={values.preferredTime}
                onChange={(e) => setValues({ ...values, preferredTime: e.target.value })}
                aria-invalid={Boolean(errors.preferredTime)}
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#22D3EE] focus:outline-none"
              >
                <option value="" className="bg-[#080B18]">
                  Select a preferred time slot
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot} className="bg-[#080B18]">
                    {slot}
                  </option>
                ))}
              </select>
              {errors.preferredTime && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.preferredTime}
                </p>
              )}
            </div>

            {/* 9. Business Requirements */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="requirements" className="block text-sm font-medium text-[#F8FAFC]">
                Business Requirements <span className="text-xs text-[#CBD5E1]/70">(Optional)</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={values.requirements}
                onChange={(e) => setValues({ ...values, requirements: e.target.value })}
                placeholder="Tell us briefly about your enquiries, workflow goals, or tools you use (e.g., Google Sheets, WhatsApp, Telegram)..."
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/85 px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/45 focus:border-[#22D3EE] focus:outline-none"
              />
            </div>

            {/* 10. Consent Checkbox */}
            <div className="md:col-span-2 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => setValues({ ...values, consent: e.target.checked })}
                  aria-invalid={Boolean(errors.consent)}
                  className="mt-1 h-4 w-4 rounded border-white/25 bg-[#080B18] text-[#8B5CF6] focus:ring-[#22D3EE]"
                />
                <span className="text-sm leading-relaxed text-[#CBD5E1]">
                  I agree to share these consultation details via email with{' '}
                  {BUSINESS_CONFIG.businessName}. I understand that I need to press Send in my
                  email app to submit my enquiry and that the requested date and time are subject
                  to confirmation. <span className="text-[#22D3EE]">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-400" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-[#CBD5E1]/85 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#22D3EE] shrink-0" aria-hidden="true" />
              <span>Date and time are subject to email confirmation.</span>
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] shadow-lg shadow-[#8B5CF6]/20 hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Send Request via Email</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
