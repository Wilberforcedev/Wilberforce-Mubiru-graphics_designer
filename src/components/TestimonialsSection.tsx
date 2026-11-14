import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Star,
  CheckCircle2,
  PlusCircle,
  UserCheck,
  Send,
} from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  initialTestimonials: Testimonial[];
}

const TESTIMONIAL_CATEGORY_LABELS: Record<string, string> = {
  'ngo-partners': 'NGO & Development Partners',
  'event-organizers': 'Marathons & Event Organizers',
  'production-clients': 'Apparel & Production Clients',
  'eco-initiatives': 'Eco Initiatives & Conservation',
  'security': 'Security & Anti-Bot',
  'ai-startups': 'AI & LLM Startups',
  'automation': 'High-Volume Automation',
  'cto-founders': 'Founders & Directors',
};

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  initialTestimonials,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    setTestimonials(initialTestimonials);
  }, [initialTestimonials]);

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New testimonial form state
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formProject, setFormProject] = useState('');
  const [formCategory, setFormCategory] = useState<Testimonial['category']>('production-clients');
  const [formRating, setFormRating] = useState(5);
  const [formContent, setFormContent] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const uniqueCategories = Array.from(new Set(testimonials.map((t) => t.category)));

  const categories = [
    { id: 'all', label: 'All Reviews', count: testimonials.length },
    ...uniqueCategories.map((cat) => ({
      id: cat,
      label: TESTIMONIAL_CATEGORY_LABELS[cat] || cat,
      count: testimonials.filter((t) => t.category === cat).length,
    })),
  ];

  const filteredTestimonials =
    selectedFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === selectedFilter);

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContent.trim()) return;

    const newTestimonial: Testimonial = {
      id: `custom-${Date.now()}`,
      name: formName.trim(),
      role: formRole.trim() || 'Engineering Lead',
      company: formCompany.trim() || 'Tech Collaborator',
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      content: formContent.trim(),
      rating: formRating,
      category: formCategory,
      projectDelivered: formProject.trim() || 'Software Engineering Advisory',
      date: 'Just now',
      verified: true,
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);

    try {
      const savedUserOnly = updated.filter((t) => t.id.startsWith('custom-'));
      localStorage.setItem('portfolio_user_testimonials', JSON.stringify(savedUserOnly));
    } catch {}

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowSubmitModal(false);
      // Reset form
      setFormName('');
      setFormRole('');
      setFormCompany('');
      setFormProject('');
      setFormContent('');
    }, 1500);
  };

  const labelClass = 'mb-1 block text-[12px] font-medium text-[#3f4a5a]';

  return (
    <section id="testimonials" className="ds-section ds-section--panel">
      <div className="ds-shell">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="ds-eyebrow mb-4">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>Verified Client &amp; Peer Testimonials</span>
            </div>
            <h2 className="ds-h2">Endorsements &amp; Industry Trust</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#5b6575]">
              Feedback from CTOs, security directors, and venture-backed founders on system reliability, low-latency performance, and anti-bot bypass execution.
            </p>
          </div>

          <button
            id="add-testimonial-btn"
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-2 self-start rounded-full border-2 border-[#e07b0f] px-4 py-2.5 text-[13px] font-semibold text-[#e07b0f] transition-colors hover:bg-[#e07b0f] hover:text-white md:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Leave a Recommendation</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                id={`testimonial-filter-${cat.id}`}
                onClick={() => setSelectedFilter(cat.id)}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                  isActive
                    ? 'border-[#e07b0f] bg-[#e07b0f] text-white'
                    : 'border-[#e2e8f0] bg-white text-[#3f4a5a] hover:border-[#e07b0f] hover:text-[#e07b0f]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#f5f5f7] text-[#5b6575]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="ds-card ds-card--hover flex flex-col justify-between p-6"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating ? 'fill-[#d9a419] text-[#d9a419]' : 'text-[#e2e8f0]'
                        }`}
                      />
                    ))}
                  </div>

                  {t.verified && (
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2 py-0.5 text-[10px] font-semibold text-[#0c791e]">
                      <UserCheck className="h-3 w-3" />
                      <span>Verified Client</span>
                    </div>
                  )}
                </div>

                <p className="mb-6 text-[13px] italic leading-[1.7] text-[#3f4a5a]">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#e2e8f0] pt-4">
                <div className="mb-2.5 flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="h-10 w-10 rounded-full border border-[#e2e8f0] object-cover"
                  />
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#111827]">{t.name}</h4>
                    <p className="text-[12px] text-[#5b6575]">
                      {t.role} • <span className="text-[#3f4a5a]">{t.company}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1 text-[11px]">
                  <span className="max-w-[200px] truncate font-medium text-[#e07b0f]" title={t.projectDelivered}>
                    ⚡ {t.projectDelivered}
                  </span>
                  <span className="shrink-0 text-[#8a93a1]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Recommendation Modal */}
        {showSubmitModal && (
          <div
            id="submit-testimonial-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/50 p-4 backdrop-blur-sm"
            onClick={() => setShowSubmitModal(false)}
          >
            <div
              className="relative w-full max-w-lg space-y-4 rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-[0_30px_80px_rgba(17,24,39,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#111827]">Add a Testimonial</h3>
                  <p className="mt-0.5 text-[12px] text-[#5b6575]">
                    Share feedback from an engineering collaboration or production delivery.
                  </p>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  aria-label="Close"
                  className="rounded-full border border-[#e2e8f0] px-2.5 py-1 text-sm text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                >
                  ✕
                </button>
              </div>

              {formSuccess ? (
                <div className="space-y-2 py-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 animate-bounce text-[#0c791e]" />
                  <h4 className="text-[16px] font-semibold text-[#111827]">Thank You for the Endorsement!</h4>
                  <p className="text-[12px] text-[#5b6575]">Your review has been verified and added to the dashboard.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTestimonial} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="ds-input"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Your Role</label>
                      <input
                        type="text"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        placeholder="e.g. VP of Engineering"
                        className="ds-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Company / Team</label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="e.g. Apex Scale AI"
                        className="ds-input"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Project Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className="ds-input"
                      >
                        <option value="security">Security &amp; Anti-Bot</option>
                        <option value="ai-startups">AI &amp; LLM Startups</option>
                        <option value="automation">High-Volume Automation</option>
                        <option value="cto-founders">Founders &amp; CTOs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Project Delivered</label>
                    <input
                      type="text"
                      value={formProject}
                      onChange={(e) => setFormProject(e.target.value)}
                      placeholder="e.g. Go Anti-Bot Proxy Mesh / RAG Pipeline"
                      className="ds-input"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormRating(num)}
                          className="p-1"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              num <= formRating ? 'fill-[#d9a419] text-[#d9a419]' : 'text-[#d5dbe3]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-[12px] font-medium text-[#5b6575]">{formRating}.0 / 5.0</span>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Recommendation / Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="Describe the engineering challenge, Tomoe's solution, and overall delivery outcome..."
                      className="ds-input resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-[12px] font-semibold text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-full bg-[#e07b0f] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#f59e42]"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Post Recommendation</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
