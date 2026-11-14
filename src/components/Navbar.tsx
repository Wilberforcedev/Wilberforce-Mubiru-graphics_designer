import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Code2,
  FolderGit2,
  Cpu,
  MessageSquareQuote,
  Briefcase,
  Mail,
  Menu,
  X,
  Sparkles,
  UserCheck,
  Linkedin,
  Instagram,
  Github,
  Layers,
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentProfile: UserProfile;
  onOpenTerminal: () => void;
  onOpenCustomizer: () => void;
  onToggleProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  onOpenTerminal,
  onOpenCustomizer,
  onToggleProfile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['skills', 'repositories', 'architecture', 'prepress-studio', 'testimonials', 'experience', 'contact'];
      let current = 'hero';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 160) {
          current = sectionId;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'repositories', label: 'Repositories', icon: FolderGit2 },
    { id: 'architecture', label: 'Architecture', icon: Code2 },
    { id: 'prepress-studio', label: 'Studio', icon: Layers },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconButton =
    'items-center justify-center w-9 h-9 rounded-full border border-[#e2e8f0] bg-white text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]';

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-40 px-3 pt-2 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-gradient-to-b before:from-white/90 before:via-white/55 before:to-transparent sm:px-5 sm:pt-3"
    >
      <div
        className={`relative mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 rounded-full border border-[#e2e8f0] bg-white/95 pl-3 pr-2 backdrop-blur-xl transition-all duration-300 sm:pl-5 ${
          isScrolled
            ? 'py-2 shadow-[0_16px_40px_rgba(17,24,39,0.1)]'
            : 'py-2.5 shadow-[0_16px_40px_rgba(17,24,39,0.06)]'
        }`}
      >
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex min-w-0 items-center gap-2.5"
          >
            <img
              src={currentProfile.avatar}
              alt=""
              width={40}
              height={40}
              decoding="async"
              className="h-10 w-10 shrink-0 rounded-full border border-[#e2e8f0] object-cover"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[15px] font-semibold tracking-[-0.01em] text-[#111827]">
                {currentProfile.name}
              </span>
              <span className="flex items-center gap-1.5 truncate text-[11px] text-[#5b6575]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0c791e]" />
                <span className="truncate">Active &middot; {currentProfile.location}</span>
              </span>
            </span>
          </a>

          <button
            id="profile-toggle-pill"
            onClick={onToggleProfile}
            title="Switch between Wilberforce Mubiru and Tomoe profiles"
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f5f5f7] px-3 py-1.5 text-[11px] font-medium text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f] md:flex"
          >
            <UserCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden 2xl:inline">Switch profile</span>
          </button>
        </div>

        {/* Desktop links */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className={`rounded-full px-3 py-2 text-[14px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#fdf2e5] text-[#e07b0f]'
                    : 'text-[#3f4a5a] hover:bg-[#fdf2e5] hover:text-[#e07b0f]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          {currentProfile.linkedinUrl && (
            <a
              id="nav-linkedin-link"
              href={currentProfile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={`${iconButton} hidden lg:inline-flex`}
              title="LinkedIn: Wilberforce Mubiru"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          {currentProfile.instagramUrl && (
            <a
              id="nav-instagram-link"
              href={currentProfile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={`${iconButton} hidden lg:inline-flex`}
              title="Instagram: @willinho23"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}

          {currentProfile.githubUrl && (
            <a
              id="nav-github-link"
              href={currentProfile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`${iconButton} hidden lg:inline-flex`}
              title={`GitHub: @${currentProfile.handle}`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          <button
            id="open-terminal-btn"
            onClick={onOpenTerminal}
            className={`${iconButton} hidden sm:inline-flex`}
            title="Open Interactive Engineer Terminal (Ctrl+K)"
          >
            <Terminal className="h-4 w-4" />
          </button>

          <button
            id="customize-profile-btn"
            onClick={onOpenCustomizer}
            className={`${iconButton} hidden md:inline-flex`}
            title="Configure profile bio & links"
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button
            id="nav-cta-hire"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e07b0f] px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#f59e42]"
          >
            <Mail className="h-4 w-4" />
            <span>Hire Me</span>
          </button>

          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${iconButton} inline-flex xl:hidden`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile / tablet drawer */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-[24px] border border-[#e2e8f0] bg-white p-3 shadow-[0_24px_60px_rgba(17,24,39,0.14)] xl:hidden">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#f5f5f7] px-3 py-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6575]">
                Current profile
              </span>
              <button
                onClick={() => {
                  onToggleProfile();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#0c791e]"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>{currentProfile.name} (Switch)</span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2.5 text-left text-[13px] font-medium text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                  >
                    <Icon className="h-4 w-4 text-[#e07b0f]" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenTerminal();
                  setMobileMenuOpen(false);
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#111827] bg-[#111827] py-2.5 text-[12px] font-semibold text-white"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Interactive CLI</span>
              </button>
              <button
                onClick={() => {
                  onOpenCustomizer();
                  setMobileMenuOpen(false);
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white py-2.5 text-[12px] font-semibold text-[#111827]"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#e07b0f]" />
                <span>Customize</span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-around border-t border-[#e2e8f0] pt-3 text-[12px] font-medium text-[#5b6575]">
              {currentProfile.linkedinUrl && (
                <a
                  href={currentProfile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#e07b0f]"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {currentProfile.instagramUrl && (
                <a
                  href={currentProfile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#e07b0f]"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span>Instagram</span>
                </a>
              )}
              {currentProfile.githubUrl && (
                <a
                  href={currentProfile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#e07b0f]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {currentProfile.whatsAppUrl && (
                <a
                  href={currentProfile.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0c791e]"
                >
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
