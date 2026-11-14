import React, { useState } from 'react';
import {
  Code2,
  ShieldCheck,
  Binary,
  Network,
  Database,
  Scissors,
  Search,
  CheckCircle2,
  Sparkles,
  Zap,
  GitFork,
  BellRing,
  TrendingUp,
  Server,
  Layers,
  Cpu,
  Boxes,
  LayoutGrid,
  ZoomIn,
  X,
  MessageCircle,
} from 'lucide-react';
import { ArchitectureProject } from '../types';

interface ProjectShowcaseProps {
  projects: ArchitectureProject[];
  onInspectRepo?: (repoId: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || '');
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    caption: string;
    tag?: string;
  } | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Binary': return Binary;
      case 'Network': return Network;
      case 'Database': return Database;
      case 'Scissors': return Scissors;
      case 'Search': return Search;
      case 'CheckCircle2': return CheckCircle2;
      case 'Sparkles': return Sparkles;
      case 'Zap': return Zap;
      case 'Code2': return Code2;
      case 'GitFork': return GitFork;
      case 'BellRing': return BellRing;
      case 'Layers': return Layers;
      case 'Cpu': return Cpu;
      case 'Boxes': return Boxes;
      case 'LayoutGrid': return LayoutGrid;
      default: return Server;
    }
  };

  // Projects that have real photographic production plates
  const photoPlates = projects.filter((p) => p.image);

  return (
    <section id="architecture" className="ds-section">
      <div className="ds-shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="ds-eyebrow mb-4">
              <Code2 className="h-3.5 w-3.5" />
              <span>Real Production Output &amp; Case Studies</span>
            </div>
            <h2 className="ds-h2">Featured Work &amp; Production Plates</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#5b6575]">
              Every plate is real production work for international NGOs (OXFAM, UKaid, Belgium, Plan), major athletic runs, and eco-initiatives. Tap any plate to inspect full resolution.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#d9eadc] bg-[#eef7ef] px-3.5 py-2 text-[12px] font-medium text-[#0c791e] md:self-auto">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#0c791e]" />
            <span>Kampala • Bulk Delivery Active</span>
          </div>
        </div>

        {/* 1. Interactive Visual Plate Grid */}
        {photoPlates.length > 0 && (
          <div className="mb-14">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photoPlates.map((plate) => (
                <div
                  key={plate.id}
                  id={`plate-${plate.id}`}
                  onClick={() => {
                    setActiveProjectId(plate.id);
                    setLightboxImage({
                      src: plate.image!,
                      title: plate.title,
                      caption: plate.caption || plate.tagline,
                      tag: plate.tag,
                    });
                  }}
                  className={`ds-card ds-card--hover group relative cursor-pointer overflow-hidden ${
                    plate.id === activeProject.id
                      ? 'border-[#e07b0f] ring-2 ring-[#e07b0f]/15'
                      : ''
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5f5f7]">
                    <img
                      src={plate.image}
                      alt={plate.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/35 via-transparent to-transparent" />

                    {plate.tag && (
                      <div className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#a85c0b] shadow-sm backdrop-blur-sm">
                        {plate.tag}
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 rounded-full bg-white/95 p-2 text-[#111827] opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4 text-[#e07b0f]" />
                    </div>
                  </div>

                  <div className="space-y-1.5 p-4">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-[#e07b0f]">{plate.category}</span>
                      <span className="text-[#8a93a1]">{plate.benchmarks[0]?.value}</span>
                    </div>
                    <h3 className="line-clamp-1 text-[15px] font-semibold text-[#111827] transition-colors group-hover:text-[#e07b0f]">
                      {plate.title}
                    </h3>
                    <p className="line-clamp-2 text-[12px] leading-[1.6] text-[#5b6575]">
                      {plate.caption || plate.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Flagship Production Case Studies & Architecture Breakdown */}
        <div className="pt-2">
          <div className="mb-6">
            <div className="ds-eyebrow ds-eyebrow--plain mb-1 text-[11px]">Detailed Case Studies</div>
            <h3 className="text-[clamp(22px,3vw,30px)] font-medium tracking-[-0.02em] text-[#111827]">
              Production Architecture &amp; Delivery Workflows
            </h3>
          </div>

          {/* Project Selector Tabs */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1">
            {projects.map((proj) => {
              const isActive = proj.id === activeProject.id;
              return (
                <button
                  key={proj.id}
                  id={`arch-tab-${proj.id}`}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'border-[#e07b0f] bg-[#e07b0f] text-white'
                      : 'border-[#e2e8f0] bg-white text-[#3f4a5a] hover:border-[#e07b0f] hover:text-[#e07b0f]'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#0c791e]'}`} />
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Project Card */}
          {activeProject && (
            <div className="overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white shadow-[0_24px_60px_rgba(17,24,39,0.07)]">
              {/* Top Bar */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#e2e8f0] bg-[linear-gradient(135deg,#faf8f4,#ffffff_60%,#fdf2e5)] p-6 sm:p-8 lg:flex-row lg:items-center">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#5b6575]">
                    <span className="rounded-full border border-[#f5dcc1] bg-[#fdf2e5] px-2.5 py-0.5 font-semibold text-[#a85c0b]">
                      {activeProject.category}
                    </span>
                    <span className="text-[#c3cad4]">•</span>
                    <span>{activeProject.clientOrContext}</span>
                    <span className="text-[#c3cad4]">•</span>
                    <span>{activeProject.duration}</span>
                  </div>
                  <h3 className="text-[clamp(22px,3vw,30px)] font-medium tracking-[-0.02em] text-[#111827]">
                    {activeProject.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-[#5b6575]">{activeProject.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 self-start lg:max-w-[40%] lg:justify-end lg:self-auto">
                  {activeProject.techStack.map((tech) => (
                    <span key={tech} className="ds-tag bg-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-8 p-6 sm:p-8">
                {activeProject.image && (
                  <div className="flex flex-col items-center gap-5 rounded-[20px] border border-[#e2e8f0] bg-[#faf8f4] p-4 sm:flex-row">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="h-36 w-full rounded-xl border border-[#e2e8f0] object-cover shadow-sm sm:w-48"
                    />
                    <div className="space-y-2 text-left">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0c791e]">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Production Verified Specimen</span>
                      </div>
                      <h4 className="text-[16px] font-semibold text-[#111827]">{activeProject.title}</h4>
                      <p className="text-[12px] leading-[1.6] text-[#5b6575]">
                        {activeProject.caption || activeProject.tagline}
                      </p>
                      <a
                        href={`https://wa.me/256755943973?text=${encodeURIComponent(`Hi Wilberforce, inquiring about ${activeProject.title}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0c791e] transition-colors hover:text-[#0a6418]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Inquire about similar bulk order on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-[20px] border border-[#f3d4d4] bg-[#fdf3f3] p-5">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a24444]">
                      The Production Challenge
                    </div>
                    <p className="text-[13px] leading-[1.7] text-[#4a3a3a]">{activeProject.problem}</p>
                  </div>

                  <div className="rounded-[20px] border border-[#d9eadc] bg-[#eef7ef] p-5">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c791e]">
                      The Engineered Solution
                    </div>
                    <p className="text-[13px] leading-[1.7] text-[#2f4636]">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Benchmarks */}
                <div>
                  <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#e07b0f]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Quality Metrics &amp; Delivery Benchmarks</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {activeProject.benchmarks.map((bm) => (
                      <div key={bm.label} className="rounded-xl border border-[#e2e8f0] bg-[#f5f5f7] p-4">
                        <div className="mb-1 text-[11px] font-medium text-[#5b6575]">{bm.label}</div>
                        <div className="text-[24px] font-semibold tracking-[-0.02em] text-[#0c791e]">{bm.value}</div>
                        <div className="mt-1 text-[11px] text-[#8a93a1]">{bm.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow */}
                <div>
                  <div className="mb-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0c791e]">
                    <Network className="h-3.5 w-3.5" />
                    <span>Production Execution Pipeline</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {activeProject.architectureWorkflow.map((step, idx) => {
                      const StepIcon = getStepIcon(step.icon);
                      return (
                        <div
                          key={step.title}
                          className="group space-y-2 rounded-xl border border-[#e2e8f0] bg-[#faf8f4] p-4 transition-colors hover:border-[#e07b0f]/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#f5dcc1] bg-[#fdf2e5] text-[#e07b0f]">
                              <StepIcon className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8a93a1]">
                              STAGE 0{idx + 1}
                            </span>
                          </div>
                          <h4 className="text-[13px] font-semibold text-[#111827] transition-colors group-hover:text-[#e07b0f]">
                            {step.title}
                          </h4>
                          <p className="text-[11px] leading-[1.6] text-[#5b6575]">{step.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/60 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white shadow-[0_30px_80px_rgba(17,24,39,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white p-4">
              <div className="min-w-0">
                {lightboxImage.tag && (
                  <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e07b0f]">
                    [{lightboxImage.tag}]
                  </span>
                )}
                <span className="truncate text-[14px] font-semibold text-[#111827] sm:text-base">
                  {lightboxImage.title}
                </span>
              </div>
              <button
                id="close-lightbox-btn"
                onClick={() => setLightboxImage(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e2e8f0] text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex max-h-[68vh] items-center justify-center bg-[#f5f5f7] p-2">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[66vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e2e8f0] bg-white p-4 text-[12px] sm:flex-row">
              <p className="text-center text-[#5b6575] sm:text-left">{lightboxImage.caption}</p>
              <a
                id="lightbox-wa-btn"
                href={`https://wa.me/256755943973?text=${encodeURIComponent(
                  `Hi Wilberforce, I saw your work "${lightboxImage.title}" on your portfolio and I would like to make an inquiry.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#0c791e] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#0a6418]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Order Similar on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
