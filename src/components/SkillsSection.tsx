import React, { useState } from 'react';
import {
  ShieldAlert,
  KeyRound,
  Smartphone,
  Fingerprint,
  BrainCircuit,
  Bot,
  Database,
  Cpu,
  Terminal,
  Zap,
  Server,
  Layers,
  Boxes,
  LayoutGrid,
  Activity,
  Palette,
  Printer,
  Brush,
  Globe,
  Scissors,
  Sparkles,
  Code2,
} from 'lucide-react';
import { TechnicalSkill } from '../types';

interface SkillsSectionProps {
  skills: TechnicalSkill[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'graphic-design': 'Graphic Design & Vectors',
  'apparel-production': 'Apparel & Screen Printing',
  'web-development': 'Web & Front-End Engineering',
  'brand-identity': 'Brand Identity & Eco Systems',
  'reverse-engineering': 'Reverse Engineering & Security',
  'ai-intelligent-systems': 'AI & Intelligent Systems',
  'automation-scraping': 'Automation & Scraping',
  'backend-cloud': 'Backend & Cloud',
  'frontend-fullstack': 'Frontend & Full-Stack',
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkillModal, setActiveSkillModal] = useState<TechnicalSkill | null>(null);

  const uniqueCategories = Array.from(new Set(skills.map((s) => s.category)));

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Disciplines', count: skills.length },
    ...uniqueCategories.map((cat) => ({
      id: cat,
      label: CATEGORY_LABELS[cat] || cat,
      count: skills.filter((s) => s.category === cat).length,
    })),
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'KeyRound': return KeyRound;
      case 'Smartphone': return Smartphone;
      case 'Fingerprint': return Fingerprint;
      case 'BrainCircuit': return BrainCircuit;
      case 'Bot': return Bot;
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Terminal': return Terminal;
      case 'Zap': return Zap;
      case 'Server': return Server;
      case 'Layers': return Layers;
      case 'Boxes': return Boxes;
      case 'LayoutGrid': return LayoutGrid;
      case 'Activity': return Activity;
      case 'Palette': return Palette;
      case 'Printer': return Printer;
      case 'Brush': return Brush;
      case 'Globe': return Globe;
      case 'Scissors': return Scissors;
      default: return Code2;
    }
  };

  return (
    <section id="skills" className="ds-section">
      <div className="ds-shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="ds-eyebrow mb-4">
              <Cpu className="h-3.5 w-3.5" />
              <span>Technical Capabilities &amp; Architecture Matrix</span>
            </div>
            <h2 className="ds-h2">Engineered for Extreme Reliability &amp; Precision</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#5b6575]">
              A comprehensive breakdown of core proficiencies across protocol reverse engineering, distributed automation, autonomous AI agent pipelines, and high-load backend infrastructure.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#d9eadc] bg-[#eef7ef] px-3.5 py-2 text-[12px] font-medium text-[#0c791e] md:self-auto">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tested in High-Stress Production Environments</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => {
            const IconComponent = getIcon(skill.iconName);
            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                onClick={() => setActiveSkillModal(skill)}
                className="ds-card ds-card--hover group flex cursor-pointer flex-col justify-between p-5"
              >
                <div>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] text-[#e07b0f] transition-colors group-hover:border-[#e07b0f]/50">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full border border-[#e2e8f0] bg-white px-2 py-0.5 text-[10px] font-medium text-[#5b6575]">
                        {skill.yearsOfExp} Yrs Exp
                      </span>
                      <span className="rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2 py-0.5 text-[10px] font-semibold text-[#0c791e]">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#111827] transition-colors group-hover:text-[#e07b0f]">
                    {skill.name}
                  </h3>

                  <p className="mb-2 mt-1 line-clamp-1 text-[12px] font-medium text-[#e07b0f]">
                    ⚡ {skill.highlight}
                  </p>

                  <p className="mb-4 line-clamp-2 text-[13px] leading-[1.6] text-[#5b6575]">
                    {skill.description}
                  </p>
                </div>

                <div className="space-y-3 border-t border-[#e2e8f0] pt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0f2f5]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#e07b0f,#0c791e)] transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="ds-tag">
                        {tag}
                      </span>
                    ))}
                    {skill.tags.length > 3 && (
                      <span className="rounded-full bg-[#f5f5f7] px-2 py-1 text-[10px] font-medium text-[#8a93a1]">
                        +{skill.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Detail Modal */}
        {activeSkillModal && (
          <div
            id="skill-detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/45 p-4 backdrop-blur-sm"
            onClick={() => setActiveSkillModal(null)}
          >
            <div
              className="relative w-full max-w-lg space-y-5 rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-[0_30px_80px_rgba(17,24,39,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] text-[#e07b0f]">
                    {React.createElement(getIcon(activeSkillModal.iconName), { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827]">{activeSkillModal.name}</h3>
                    <p className="text-[12px] capitalize text-[#5b6575]">
                      Category: {activeSkillModal.category.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSkillModal(null)}
                  aria-label="Close"
                  className="rounded-full border border-[#e2e8f0] px-2.5 py-1 text-sm text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] p-3.5 text-[13px] font-medium text-[#a85c0b]">
                ⭐ Highlight: {activeSkillModal.highlight}
              </div>

              <div className="space-y-1">
                <div className="text-[13px] font-semibold text-[#111827]">Architectural Context &amp; Production Use:</div>
                <p className="text-[14px] leading-[1.7] text-[#5b6575]">{activeSkillModal.description}</p>
              </div>

              <div>
                <div className="mb-2 text-[13px] font-semibold text-[#111827]">Core Tools &amp; Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {activeSkillModal.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2.5 py-1 text-[12px] font-medium text-[#0c791e]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-3 text-[13px] text-[#5b6575]">
                <span>Production Proficiency: <strong className="text-[#e07b0f]">{activeSkillModal.proficiency}%</strong></span>
                <span>Experience: <strong className="text-[#111827]">{activeSkillModal.yearsOfExp} Years</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
