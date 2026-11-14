import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Check,
  Copy,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Instagram,
  Linkedin,
  Github,
  FileText,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Timezone clock in real-time
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const quickBriefText =
    'Hi Wilberforce! I need [quantity] custom branded [tees / vests / merchandise] for [organization / event] by [date]. Artwork is [ready / needs design]. Delivery in [location].';

  const copyQuickBrief = () => {
    navigator.clipboard.writeText(quickBriefText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1000);
  };

  const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5b6575]';

  return (
    <section id="contact" className="ds-section ds-section--panel">
      <div className="ds-shell">
        <div className="mb-10 md:mb-12">
          <div className="ds-eyebrow mb-4">
            <Mail className="h-3.5 w-3.5" />
            <span>Direct Inquiries &amp; Bulk Orders</span>
          </div>
          <h2 className="ds-h2">Let&apos;s Make Your Next Bulk Order Print Perfect</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#5b6575]">
            Bulk tees, reflector vests, event kits, and NGO branding. Share your quantity, deadline, and artwork specifications. I reply fastest on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Direct Communication Channels & Status */}
          <div className="space-y-4 lg:col-span-5">
            {/* WhatsApp Priority Callout */}
            {profile.whatsAppUrl && (
              <div className="space-y-3 rounded-[20px] border border-[#d9eadc] bg-[#eef7ef] p-6">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0c791e]">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4" />
                    FASTEST RESPONSE
                  </span>
                  <span className="rounded-full border border-[#d9eadc] bg-white px-2.5 py-0.5">
                    &lt; 30 Mins
                  </span>
                </div>
                <h4 className="text-[18px] font-semibold text-[#111827]">Direct WhatsApp Chat</h4>
                <p className="text-[13px] leading-[1.65] text-[#3f4a5a]">
                  Send sketches, quantity requirements, or rush event dates directly. I will quote back immediately with lead time and color specs.
                </p>
                <a
                  id="contact-wa-link"
                  href={profile.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0c791e] px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#0a6418]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp ({profile.phone || '+256 755943973'})</span>
                </a>
              </div>
            )}

            {/* Status & SLA Box */}
            <div className="space-y-4 rounded-[20px] border border-[#e2e8f0] bg-white p-6">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5b6575]">
                  PRODUCTION STATUS
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2.5 py-0.5 text-[11px] font-semibold text-[#0c791e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0c791e]" />
                  <span>Open for Bulk Orders</span>
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-[16px] font-semibold text-[#111827]">Kleberson Wear UG &amp; Grin Mates</h4>
                <p className="text-[13px] leading-[1.65] text-[#5b6575]">
                  Based in Kampala, Uganda. Bulk delivery across East Africa and onsite activation available for marathons, conferences, and NGO field teams.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-[#e2e8f0] bg-[#f5f5f7] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a93a1]">LOCATION</div>
                  <div className="mt-0.5 text-[13px] font-semibold text-[#111827]">{profile.location}</div>
                </div>
                <div className="rounded-xl border border-[#e2e8f0] bg-[#f5f5f7] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a93a1]">LOCAL TIME</div>
                  <div className="mt-0.5 text-[13px] font-semibold text-[#0c791e]">{currentTime || 'Active'}</div>
                </div>
              </div>
            </div>

            {/* Quick Copyable Brief Template */}
            <div className="space-y-2.5 rounded-[20px] border border-[#e2e8f0] bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5b6575]">
                  <FileText className="h-3.5 w-3.5 text-[#e07b0f]" />
                  <span>QUICK BRIEF TEMPLATE</span>
                </div>
                <button
                  id="copy-brief-btn"
                  onClick={copyQuickBrief}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#e07b0f] transition-colors hover:text-[#f59e42]"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
              <p className="select-all rounded-xl border border-[#e2e8f0] bg-[#f5f5f7] p-3 text-[12px] leading-[1.65] text-[#3f4a5a]">
                &ldquo;{quickBriefText}&rdquo;
              </p>
            </div>

            {/* Direct Copyable Email Box */}
            <div className="flex items-center justify-between gap-3 rounded-[20px] border border-[#e2e8f0] bg-white p-5">
              <div className="min-w-0">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a93a1]">
                  DIRECT INBOX
                </div>
                <div className="truncate text-[13px] font-medium text-[#111827]">{profile.email}</div>
              </div>
              <button
                id="copy-email-btn"
                onClick={copyEmail}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-2 text-[12px] font-semibold text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#0c791e]" />
                    <span className="text-[#0c791e]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social & Direct Communication Channels */}
            <div className="grid grid-cols-2 gap-3">
              <a
                id="contact-linkedin-card"
                href={profile.linkedinUrl || 'https://www.linkedin.com/in/wilberforce-mubiru'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-white p-3.5 transition-colors hover:border-[#e07b0f]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8a93a1]">
                    <Linkedin className="h-3 w-3" />
                    <span>LINKEDIN</span>
                  </div>
                  <div className="mt-0.5 truncate text-[12px] font-semibold text-[#111827] group-hover:text-[#e07b0f]">
                    {profile.linkedinHandle || 'wilberforce-mubiru'}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#8a93a1] group-hover:text-[#e07b0f]" />
              </a>

              <a
                id="contact-instagram-card"
                href={profile.instagramUrl || 'https://instagram.com/willinho23'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-white p-3.5 transition-colors hover:border-[#e07b0f]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8a93a1]">
                    <Instagram className="h-3 w-3" />
                    <span>INSTAGRAM</span>
                  </div>
                  <div className="mt-0.5 truncate text-[12px] font-semibold text-[#111827] group-hover:text-[#e07b0f]">
                    @{profile.instagramHandle || 'willinho23'}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#8a93a1] group-hover:text-[#e07b0f]" />
              </a>

              <a
                id="contact-github-card"
                href={profile.githubUrl || 'https://github.com/Wilberforcedev'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-white p-3.5 transition-colors hover:border-[#e07b0f]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8a93a1]">
                    <Github className="h-3 w-3" />
                    <span>GITHUB</span>
                  </div>
                  <div className="mt-0.5 truncate text-[12px] font-semibold text-[#111827] group-hover:text-[#e07b0f]">
                    @{profile.handle}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#8a93a1] group-hover:text-[#e07b0f]" />
              </a>

              <a
                id="contact-whatsapp-card"
                href={profile.whatsAppUrl || 'https://wa.me/256755943973'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#d9eadc] bg-[#eef7ef] p-3.5 transition-colors hover:border-[#0c791e]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0c791e]">
                    <MessageCircle className="h-3 w-3" />
                    <span>WHATSAPP</span>
                  </div>
                  <div className="mt-0.5 truncate text-[12px] font-semibold text-[#0a6418]">
                    {profile.phone || '+256 755943973'}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#0c791e]" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-[0_24px_60px_rgba(17,24,39,0.07)] sm:p-8">
              <h3 className="mb-1 text-[20px] font-semibold text-[#111827]">
                Send an Order Specification or Inquiry
              </h3>
              <p className="mb-6 text-[13px] leading-[1.6] text-[#5b6575]">
                Fill out the form below with your garment requirements, quantity, and deadlines for a formal quote.
              </p>

              {submitSuccess ? (
                <div className="space-y-2 rounded-[16px] border border-[#d9eadc] bg-[#eef7ef] p-8 text-center">
                  <Check className="mx-auto h-10 w-10 text-[#0c791e]" />
                  <h4 className="text-[16px] font-semibold text-[#111827]">Inquiry Dispatched Successfully!</h4>
                  <p className="text-[13px] leading-[1.6] text-[#3f4a5a]">
                    Thank you for reaching out. Wilberforce will review your specifications and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>YOUR NAME / ORGANIZATION</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Ronald Kigozi (OXFAM Partner)"
                        className="ds-input"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="your.email@organization.org"
                        className="ds-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>PROJECT OR ORDER TYPE</label>
                    <input
                      type="text"
                      required
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="e.g. 500 High-Vis Reflector Vests + Event Running Kits"
                      className="ds-input"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>SPECIFICATIONS &amp; DEADLINE DETAILS</label>
                    <textarea
                      required
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Specify garment types, quantities (e.g. 500 pcs), print technique (Screen / DTF / Embroidery), required delivery date, and whether vector artwork is ready..."
                      className="ds-input resize-none"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#5b6575]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#0c791e]" />
                      <span>Direct line to Mubiru Wilberforce • Confidential inquiry</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e07b0f] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#f59e42] disabled:opacity-50 sm:w-auto"
                    >
                      {isSubmitting ? (
                        <span>Sending Dispatch...</span>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Dispatch Order Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
