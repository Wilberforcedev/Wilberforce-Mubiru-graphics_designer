import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Cpu,
  FolderGit2,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  MessageSquareQuote,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeroSectionProps {
  profile: UserProfile;
  onExploreRepos: () => void;
  onExploreSkills: () => void;
  onExploreTestimonials: () => void;
  onContact: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onExploreRepos,
  onExploreSkills,
  onExploreTestimonials,
  onContact,
  onOpenTerminal,
}) => {
  const isEngineer = profile.name.toLowerCase().includes('tomoe');
  const [firstName, ...restOfName] = profile.name.trim().split(/\s+/);
  const lastName = restOfName.join(' ');
  const availability = profile.statusText.split('•').pop()?.trim() || profile.statusText;
  const gyaShort = profile.gyaRole?.includes('•')
    ? `GYA • ${profile.gyaRole.split('•').pop()?.trim()}`
    : profile.gyaRole;
  const initials = profile.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const stats = isEngineer
    ? [
        { value: `${profile.stats.yearsExperience}+`, label: 'Years architecting' },
        { value: `${profile.stats.productionRepos}`, label: 'Repos in production' },
        { value: profile.stats.totalThroughput, label: 'Traffic handled' },
        { value: profile.stats.uptimeSLA, label: 'Uptime SLA' },
      ]
    : [
        { value: `${profile.stats.yearsExperience}+`, label: 'Years of craft' },
        { value: `${profile.stats.verifiedClients}`, label: 'Clients served' },
        { value: `${profile.stats.productionRepos}`, label: 'Projects delivered' },
        { value: profile.stats.totalThroughput.split(/\s+/)[0], label: 'NGO partners' },
      ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-[#e2e8f0] bg-[linear-gradient(135deg,#faf8f4_0%,#ffffff_52%,#fdf2e5_100%)] pt-24 pb-16 sm:pt-28 md:pb-20 lg:pt-32"
    >
      <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(224,123,15,0.14),rgba(224,123,15,0)_68%)]" />

      <div className="ds-shell relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 pb-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:pb-16">
          {/* Copy */}
          <div className="min-w-0 max-w-[680px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="ds-eyebrow">{availability}</span>

              {profile.gyaRole && (
                <a
                  id="hero-gya-badge"
                  href="#experience"
                  title={profile.gyaRole}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#d9eadc] bg-[#eef7ef] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c791e] transition-colors hover:border-[#0c791e]/50"
                >
                  <Award className="h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0 truncate sm:hidden">{gyaShort}</span>
                  <span className="hidden min-w-0 truncate sm:inline">{profile.gyaRole}</span>
                </a>
              )}
            </div>

            <h1 className="mt-5 text-[clamp(46px,9vw,76px)] font-medium leading-[1.02] tracking-[-0.035em] text-[#111827] sm:text-[clamp(46px,6.2vw,76px)]">
              <span className="block">{firstName}</span>
              {lastName && (
                <span className="block">
                  <span className="text-[#e07b0f]">{lastName}</span>
                  <span className="text-[#e07b0f]">.</span>
                  <span className="text-[#8a93a1]"> </span>
                </span>
              )}
            </h1>

            <p className="mt-5 text-[17px] leading-snug text-[#3f4a5a] sm:text-lg">
              {profile.primaryTitle}
              <span className="mx-2 text-[#e2e8f0]">/</span>
              <span className="text-[#0c791e]">{profile.secondaryTitle}</span>
            </p>

            <p className="mt-4 max-w-[590px] text-[17px] leading-[1.75] text-[#5b6575]">
              {profile.shortBio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {profile.whatsAppUrl && (
                <a
                  id="hero-cta-whatsapp"
                  href={profile.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn--primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}

              <button id="hero-cta-repos" onClick={onExploreRepos} className="ds-btn">
                <FolderGit2 className="h-4 w-4" />
                <span>Explore the work</span>
              </button>

              <button
                id="hero-cta-contact"
                onClick={onContact}
                className="group inline-flex items-center gap-1.5 px-1 py-3 text-[15px] font-semibold text-[#e07b0f] transition-colors hover:text-[#f59e42]"
              >
                <span>Get in touch</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] text-[#3f4a5a]">
              <li className="flex items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-[#0c791e]" />
                <MapPin className="h-3.5 w-3.5 text-[#5b6575]" />
                {profile.location}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-[#0c791e]" />
                {availability}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-[#0c791e]" />
                {profile.company ?? profile.founderOf}
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-[#e2e8f0] pt-6">
              {profile.linkedinUrl && (
                <a
                  id="hero-linkedin-pill"
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  title="Connect on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}

              {profile.instagramUrl && (
                <a
                  id="hero-instagram-pill"
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram profile"
                  title={`Instagram: @${profile.instagramHandle ?? profile.handle}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}

              {profile.githubUrl && (
                <a
                  id="hero-github-pill"
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  title={`GitHub: @${profile.handle}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}

              {profile.whatsAppUrl && (
                <a
                  id="hero-whatsapp-pill"
                  href={profile.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title={`WhatsApp: ${profile.phone ?? profile.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d9eadc] bg-[#eef7ef] text-[#0c791e] transition-colors hover:border-[#0c791e]"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}

              <span className="mx-1.5 hidden h-4 w-px bg-[#e2e8f0] sm:block" />

              <button
                id="hero-cta-skills"
                onClick={onExploreSkills}
                className="group inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[13px] font-semibold text-[#5b6575] transition-colors hover:text-[#e07b0f]"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>Skills</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <button
                id="hero-cta-testimonials"
                onClick={onExploreTestimonials}
                className="group inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[13px] font-semibold text-[#5b6575] transition-colors hover:text-[#e07b0f]"
              >
                <MessageSquareQuote className="h-3.5 w-3.5" />
                <span>Testimonials</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <button
                id="hero-launch-cli"
                onClick={onOpenTerminal}
                title="Open the interactive CLI (Ctrl+K)"
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>CLI</span>
              </button>
            </div>
          </div>

          {/* Visual: lanyard ID card */}
          <div className="flex w-full flex-col items-center justify-self-end lg:max-w-[404px] lg:pt-2">
            <div className="relative z-[2] mb-[-6px] flex flex-col items-center">
              <div className="grid h-[126px] w-[52px] place-items-center rounded-[10px_10px_7px_7px] bg-[linear-gradient(180deg,#138c28,#0c791e_52%,#075c14)] font-mono text-[12px] font-bold tracking-[0.16em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),inset_0_-10px_16px_rgba(0,0,0,0.2),0_8px_18px_rgba(12,121,30,0.2)] [text-orientation:upright] [writing-mode:vertical-rl]">
                {lastName ? lastName.toUpperCase() : firstName.toUpperCase()}
              </div>
              <div className="relative h-[26px] w-[44px] rounded-[7px_7px_5px_5px] bg-[linear-gradient(180deg,#9aa3af,#4b5563_62%,#374151)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_12px_rgba(17,24,39,0.26)]">
                <span className="absolute left-1/2 top-[20px] h-[22px] w-[26px] -translate-x-1/2 rounded-full border-[3px] border-[#9aa3af]" />
              </div>
            </div>

            <div className="relative z-[1] w-full rounded-[28px] border border-[#e2e8f0] bg-white px-4 pb-[18px] pt-[26px] shadow-[0_30px_70px_rgba(17,24,39,0.16)]">
              <div className="mx-auto mb-3 h-2 w-14 rounded-full bg-[#e8ebf0] shadow-[inset_0_2px_3px_rgba(17,24,39,0.25)]" />

              <div className="flex items-center justify-between gap-3 px-1 pb-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#111827] text-[12px] font-bold tracking-[0.08em] text-white">
                  {initials}
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7ef] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0c791e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0c791e] shadow-[0_0_0_4px_rgba(12,121,30,0.12)]" />
                  {availability}
                </span>
              </div>

              <div className="aspect-[5/4] overflow-hidden rounded-[18px] bg-[#f5f5f7]">
                <img
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover object-[center_22%]"
                />
              </div>

              <div className="px-1 pt-4">
                <h2 className="m-0 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111827]">
                  {profile.name}
                </h2>
                <p className="mb-3.5 mt-[3px] text-[14px] font-semibold text-[#e07b0f]">
                  {profile.primaryTitle}
                </p>

                <dl className="m-0 p-0 text-[13px]">
                  <div className="flex items-baseline justify-between gap-3 border-t border-[#e2e8f0] py-[9px]">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6575]">
                      Base
                    </dt>
                    <dd className="m-0 text-right font-medium text-[#111827]">{profile.location}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-t border-[#e2e8f0] py-[9px]">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6575]">
                      Company
                    </dt>
                    <dd className="m-0 max-w-[62%] text-right font-medium text-[#111827]">
                      {profile.company ?? profile.founderOf}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-t border-[#e2e8f0] py-[9px]">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6575]">
                      Availability
                    </dt>
                    <dd className="m-0 text-right font-medium text-[#0c791e]">{availability}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b6575]">
              <Sparkles className="h-3.5 w-3.5 text-[#e07b0f]" />
              @{profile.handle}
            </span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#e2e8f0] pt-7 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[32px] font-medium leading-none tracking-[-0.03em] text-[#111827]">
                {stat.value}
              </p>
              <p className="mt-[7px] text-[12px] font-medium uppercase tracking-[0.08em] text-[#5b6575]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
