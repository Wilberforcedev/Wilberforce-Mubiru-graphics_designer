import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { UserProfile } from '../types';
import { TOMOE_PROFILE, WILBERFORCE_PROFILE } from '../data/portfolioData';

interface ProfileCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  onSaveCustomProfile: (profile: UserProfile) => void;
}

const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6575] mb-1.5';

export const ProfileCustomizerModal: React.FC<ProfileCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectProfile,
  onSaveCustomProfile,
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [handle, setHandle] = useState(currentProfile.handle);
  const [primaryTitle, setPrimaryTitle] = useState(currentProfile.primaryTitle);
  const [secondaryTitle, setSecondaryTitle] = useState(currentProfile.secondaryTitle);
  const [shortBio, setShortBio] = useState(currentProfile.shortBio);
  const [email, setEmail] = useState(currentProfile.email);
  const [location, setLocation] = useState(currentProfile.location);
  const [statusText, setStatusText] = useState(currentProfile.statusText);
  const [githubUrl, setGithubUrl] = useState(currentProfile.githubUrl);

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentProfile,
      name,
      handle,
      primaryTitle,
      secondaryTitle,
      shortBio,
      email,
      location,
      statusText,
      githubUrl,
    };
    onSaveCustomProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleApplyPreset = (preset: UserProfile) => {
    setName(preset.name);
    setHandle(preset.handle);
    setPrimaryTitle(preset.primaryTitle);
    setSecondaryTitle(preset.secondaryTitle);
    setShortBio(preset.shortBio);
    setEmail(preset.email);
    setLocation(preset.location);
    setStatusText(preset.statusText);
    setGithubUrl(preset.githubUrl);
    onSelectProfile(preset);
  };

  return (
    <div
      id="profile-customizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fdf2e5] border border-[#e07b0f]/25 flex items-center justify-center text-[#e07b0f]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111827] font-display">Portfolio Identity &amp; Profile</h3>
              <p className="text-xs text-[#5b6575]">
                Switch presets or customize bio and credentials seamlessly.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close profile customizer"
            className="p-1.5 rounded-lg text-[#5b6575] hover:text-[#111827] hover:bg-[#f5f5f7]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Preset Selector Buttons */}
        <div className="space-y-2">
          <label className={labelClass}>Quick Persona Switcher:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Tomoe Preset Card */}
            <button
              type="button"
              onClick={() => handleApplyPreset(TOMOE_PROFILE)}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                currentProfile.handle === 'TomoeGozen82'
                  ? 'bg-[#eef7ef] border-[#0c791e]/50 ring-1 ring-[#0c791e]/30'
                  : 'bg-[#faf8f4] border-[#e2e8f0] hover:border-[#e07b0f]/40 hover:bg-white'
              }`}
            >
              <img
                src={TOMOE_PROFILE.avatar}
                alt="Tomoe"
                className="w-10 h-10 rounded-xl object-cover border border-[#e2e8f0]"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#111827] flex items-center justify-between gap-2">
                  <span>Tomoe</span>
                  {currentProfile.handle === 'TomoeGozen82' && (
                    <span className="text-[10px] font-mono text-[#0c791e]">ACTIVE</span>
                  )}
                </div>
                <div className="text-[11px] text-[#5b6575] truncate">
                  {TOMOE_PROFILE.primaryTitle}
                </div>
              </div>
            </button>

            {/* Wilberforce Preset Card */}
            <button
              type="button"
              onClick={() => handleApplyPreset(WILBERFORCE_PROFILE)}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                currentProfile.handle === 'wilberofficial'
                  ? 'bg-[#fdf2e5] border-[#e07b0f]/50 ring-1 ring-[#e07b0f]/30'
                  : 'bg-[#faf8f4] border-[#e2e8f0] hover:border-[#e07b0f]/40 hover:bg-white'
              }`}
            >
              <img
                src={WILBERFORCE_PROFILE.avatar}
                alt="Wilberforce"
                className="w-10 h-10 rounded-xl object-cover border border-[#e2e8f0]"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#111827] flex items-center justify-between gap-2">
                  <span>Mubiru Wilberforce</span>
                  {currentProfile.handle === 'wilberofficial' && (
                    <span className="text-[10px] font-mono text-[#e07b0f]">ACTIVE</span>
                  )}
                </div>
                <div className="text-[11px] text-[#5b6575] truncate">
                  {WILBERFORCE_PROFILE.primaryTitle}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Custom Edit Form */}
        <form onSubmit={handleSave} className="space-y-3.5 pt-4 border-t border-[#e2e8f0]">
          <div className={labelClass}>Fine-Tune Details:</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ds-input text-xs"
              />
            </div>
            <div>
              <label className={labelClass}>Handle / Moniker</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="ds-input text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Primary Title</label>
              <input
                type="text"
                value={primaryTitle}
                onChange={(e) => setPrimaryTitle(e.target.value)}
                className="ds-input text-xs"
              />
            </div>
            <div>
              <label className={labelClass}>Secondary Title</label>
              <input
                type="text"
                value={secondaryTitle}
                onChange={(e) => setSecondaryTitle(e.target.value)}
                className="ds-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Short Headline Bio</label>
            <textarea
              rows={3}
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="ds-input text-xs font-sans resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ds-input text-xs font-mono"
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="ds-input text-xs"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#eceef2] border border-[#e2e8f0] text-[#5b6575] hover:text-[#111827] text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#e07b0f] hover:bg-[#f59e42] text-white font-semibold text-xs transition-all shadow-[0_10px_24px_-10px_rgba(224,123,15,0.7)]"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
