import React, { useState, useEffect } from 'react';
import {
  Search,
  Terminal,
  FolderGit2,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  X,
  Layers,
  UserCheck,
} from 'lucide-react';
import { UserProfile, CodeRepository, ArchitectureProject } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  repositories: CodeRepository[];
  showcases: ArchitectureProject[];
  onNavigateSection: (id: string) => void;
  onOpenTerminal: () => void;
  onToggleProfile: () => void;
}

const rowClass =
  'w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-[#111827] hover:bg-[#f5f5f7] transition-colors';

const chipClass =
  'text-[10px] font-mono uppercase tracking-wider text-[#5b6575] bg-[#f5f5f7] border border-[#e2e8f0] px-2 py-0.5 rounded-md shrink-0';

const sectionLabelClass =
  'text-[10px] uppercase tracking-[0.16em] text-[#5b6575] px-2 mb-1.5 font-mono';

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  profile,
  repositories,
  showcases,
  onNavigateSection,
  onOpenTerminal,
  onToggleProfile,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredRepos = repositories.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredShowcases = showcases.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.tagline.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#111827]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#e2e8f0] rounded-[24px] shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] overflow-hidden text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e2e8f0] bg-[#faf8f4]">
          <Search className="w-4 h-4 text-[#e07b0f] shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search repos, projects, social profiles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#111827] placeholder:text-[#9aa3b2] focus:outline-none text-sm"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1.5 text-[#5b6575] hover:text-[#111827] rounded-lg hover:bg-white border border-transparent hover:border-[#e2e8f0]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-[60vh] overflow-y-auto p-3.5 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className={sectionLabelClass}>Quick Actions</div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenTerminal();
                }}
                className={rowClass}
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-[#e07b0f]" />
                  <span className="font-medium">Launch Interactive Terminal (CLI)</span>
                </div>
                <span className={chipClass}>CLI</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateSection('prepress-studio');
                }}
                className={rowClass}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#0c791e]" />
                  <span className="font-medium">Open Pre-Press &amp; Garment Simulator</span>
                </div>
                <span className={chipClass}>Studio</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onToggleProfile();
                }}
                className={rowClass}
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#111827]" />
                  <span className="font-medium">Switch Profile Persona (Wilberforce / Tomoe)</span>
                </div>
                <span className={chipClass}>Switch</span>
              </button>
            </div>
          </div>

          {/* Social Profiles */}
          <div>
            <div className={sectionLabelClass}>Verified Social Channels</div>
            <div className="grid grid-cols-2 gap-1.5">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f5f7] border border-[#e2e8f0] hover:border-[#e07b0f]/40 hover:bg-white text-[#111827] transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0a66c2] shrink-0" />
                  <span className="truncate">LinkedIn Profile</span>
                </a>
              )}

              {profile.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f5f7] border border-[#e2e8f0] hover:border-[#e07b0f]/40 hover:bg-white text-[#111827] transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#c13584] shrink-0" />
                  <span className="truncate">Instagram (@willinho23)</span>
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f5f7] border border-[#e2e8f0] hover:border-[#e07b0f]/40 hover:bg-white text-[#111827] transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-[#111827] shrink-0" />
                  <span className="truncate">GitHub (@{profile.handle})</span>
                </a>
              )}

              {profile.whatsAppUrl && (
                <a
                  href={profile.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f5f7] border border-[#e2e8f0] hover:border-[#0c791e]/40 hover:bg-white text-[#111827] transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#0c791e] shrink-0" />
                  <span className="truncate">WhatsApp (+256 755943973)</span>
                </a>
              )}
            </div>
          </div>

          {/* Repositories */}
          {filteredRepos.length > 0 && (
            <div>
              <div className={sectionLabelClass}>Repositories ({filteredRepos.length})</div>
              <div className="space-y-1">
                {filteredRepos.slice(0, 5).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.liveDemoUrl || repo.cloneUrl || `https://github.com/${repo.fullName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-[#f5f5f7] text-[#111827] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#e07b0f] shrink-0" />
                      <span className="font-semibold">{repo.name}</span>
                      <span className="text-[#5b6575] truncate text-[11px]">{repo.description}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#0c791e] shrink-0">
                      {repo.primaryLanguage}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Showcases */}
          {filteredShowcases.length > 0 && (
            <div>
              <div className={sectionLabelClass}>Client Artwork &amp; Case Studies</div>
              <div className="space-y-1">
                {filteredShowcases.slice(0, 4).map((caseStudy) => (
                  <button
                    key={caseStudy.id}
                    onClick={() => {
                      onClose();
                      onNavigateSection('architecture');
                    }}
                    className={`${rowClass} text-left`}
                  >
                    <div className="truncate">
                      <span className="font-semibold">{caseStudy.title}</span>
                      <span className="text-[#5b6575] ml-2 text-[11px] truncate">
                        {caseStudy.tagline}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#e07b0f] shrink-0">
                      {caseStudy.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#f5f5f7] border-t border-[#e2e8f0] text-[10px] font-mono uppercase tracking-wider text-[#5b6575]">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
