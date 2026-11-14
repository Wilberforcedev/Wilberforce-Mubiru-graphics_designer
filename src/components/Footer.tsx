import React from 'react';
import { Terminal, ArrowUp, ShieldCheck, Github, ExternalLink, Linkedin, Instagram } from 'lucide-react';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'skills', label: 'Skills' },
    { id: 'repositories', label: 'Repositories' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'prepress-studio', label: 'Studio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#0a6418] text-[#e8f3ea]">
      <div className="ds-shell py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-white ring-1 ring-white/20">
                <Terminal className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[16px] font-semibold text-white">{profile.name}</div>
                <div className="text-[13px] text-[#bfe3c6]">{profile.primaryTitle}</div>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-[1.7] text-[#c6e6cc]">{profile.shortBio}</p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8e6b4] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a8e6b4]" />
              </span>
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>All Systems Operational (99.98% SLA)</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a9d9b2]">
              Explore
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[#d7efdb] transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a9d9b2]">
              Contact
            </div>
            <div className="mt-4 space-y-2 text-[13px]">
              <a
                href={`mailto:${profile.email}`}
                className="block break-all text-[#d7efdb] transition-colors hover:text-white"
              >
                {profile.email}
              </a>
              <a
                href={profile.whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-[#d7efdb] transition-colors hover:text-white"
              >
                {profile.phone ?? '+256 755943973'}
              </a>
              <div className="text-[#bfe3c6]">{profile.location}</div>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0a6418]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {profile.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0a6418]"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0a6418]"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              <a
                href={profile.vercelUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Vercel site"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0a6418]"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-[11px] text-[#bddfc4] sm:flex-row">
          <div>
            &copy; {new Date().getFullYear()} {profile.name} (@{profile.handle}). Engineered with precision.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-[#9dcfa7]">build-sha: 4e82b9f</span>
            <span className="text-white/25">•</span>
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                LinkedIn
              </a>
            )}
            {profile.instagramUrl && (
              <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                Instagram
              </a>
            )}
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              GitHub
            </a>
            <a href={profile.vercelUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              Vercel Site
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 font-medium text-white transition-colors hover:bg-white hover:text-[#0a6418]"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
