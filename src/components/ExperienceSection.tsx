import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="ds-section">
      <div className="ds-shell">
        <div className="mb-10 md:mb-12">
          <div className="ds-eyebrow mb-4">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Career, Global Advocacy &amp; Track Record</span>
          </div>
          <h2 className="ds-h2">Professional Experience &amp; Impact</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#5b6575]">
            Track record spanning global youth ambassadorship, international NGO apparel branding, pre-press color separations, and sustainable community platforms.
          </p>
        </div>

        <div className="relative ml-3 space-y-8 border-l border-[#d7dde6] pl-6 sm:ml-5 sm:pl-8">
          {experience.map((item) => {
            const isAmbassador = item.type === 'Ambassador' || item.type === 'Global Fellowship';

            return (
              <div key={item.id} className="group relative">
                <div
                  className={`absolute -left-[33px] top-6 h-4 w-4 rounded-full border-2 bg-white transition-transform group-hover:scale-110 sm:-left-[41px] ${
                    isAmbassador ? 'border-[#e07b0f]' : 'border-[#0c791e]'
                  }`}
                />

                <div
                  className={`space-y-4 rounded-[20px] border bg-white p-6 transition-colors ${
                    isAmbassador
                      ? 'border-[#f5dcc1] hover:border-[#e07b0f]/60'
                      : 'border-[#e2e8f0] hover:border-[#0c791e]/40'
                  }`}
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[18px] font-semibold text-[#111827] transition-colors group-hover:text-[#e07b0f]">
                          {item.role}
                        </h3>
                        {isAmbassador && (
                          <span className="hidden items-center gap-1 rounded-full border border-[#f5dcc1] bg-[#fdf2e5] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#a85c0b] sm:inline-flex">
                            <Award className="h-3 w-3" />
                            Honorary Appointment
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[14px] font-semibold ${
                          isAmbassador ? 'text-[#e07b0f]' : 'text-[#0c791e]'
                        }`}
                      >
                        {item.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-white px-2.5 py-1 text-[#5b6575]">
                        <Calendar className="h-3 w-3 text-[#8a93a1]" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-white px-2.5 py-1 text-[#5b6575]">
                        <MapPin className="h-3 w-3 text-[#8a93a1]" />
                        {item.location}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-semibold ${
                          isAmbassador
                            ? 'border-[#f5dcc1] bg-[#fdf2e5] text-[#a85c0b]'
                            : 'border-[#d9eadc] bg-[#eef7ef] text-[#0c791e]'
                        }`}
                      >
                        {isAmbassador && <Award className="h-3 w-3" />}
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-[14px] leading-[1.7] text-[#3f4a5a]">{item.summary}</p>

                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5b6575]">
                      Key Deliverables &amp; Outcomes:
                    </div>
                    <ul className="space-y-1.5 text-[13px] text-[#3f4a5a]">
                      {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                              isAmbassador ? 'text-[#e07b0f]' : 'text-[#0c791e]'
                            }`}
                          />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-[#e2e8f0] pt-3">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                          isAmbassador
                            ? 'border-[#f5dcc1] bg-[#fdf2e5] text-[#a85c0b]'
                            : 'border-[#e2e8f0] bg-[#f5f5f7] text-[#5b6575]'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
