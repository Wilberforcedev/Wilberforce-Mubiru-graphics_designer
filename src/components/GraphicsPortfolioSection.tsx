import React, { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Filter, ImageOff, Search, X, ZoomIn } from 'lucide-react';
import { GRAPHICS_PORTFOLIO, GraphicsPortfolioItem } from '../data/graphicsPortfolio';

const categories = ['All', ...Array.from(new Set(GRAPHICS_PORTFOLIO.map((item) => item.category)))];

export const GraphicsPortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<GraphicsPortfolioItem | null>(null);
  const [imageFailed, setImageFailed] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GRAPHICS_PORTFOLIO.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const haystack = [item.title, item.category, item.role, item.context, item.description, ...item.methods]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [activeCategory, query]);

  const featured = GRAPHICS_PORTFOLIO.filter((item) => item.featured);

  const markImageFailed = (id: string) =>
    setImageFailed((current) => ({ ...current, [id]: true }));

  return (
    <section id="graphics-portfolio" className="ds-section ds-section--panel">
      <div className="ds-shell">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="ds-eyebrow mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Graphics • Apparel • Print • Brand Production</span>
            </div>
            <h2 className="ds-h2">Graphics &amp; Print Portfolio</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-[#5b6575]">
              A curated body of practical design work spanning NGO and institutional apparel,
              screen printing, DTF, sublimation, vinyl, packaging, promotional merchandise and
              campaign visuals. The focus is not only on the artwork, but on how it translates
              into production-ready physical output.
            </p>
          </div>

          <div className="rounded-[20px] border border-[#e2e8f0] bg-[#faf8f4] px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e07b0f]">POSITIONING</div>
            <div className="mt-1 text-[14px] font-semibold text-[#111827]">Graphic Artist • Brand Production Specialist</div>
            <div className="text-[12px] text-[#5b6575]">Apparel &amp; Print Designer</div>
          </div>
        </div>

        <div className="mb-8 space-y-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 shrink-0 text-[#8a93a1]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, methods, clients or categories..."
              className="ds-input pl-10"
              style={{ paddingLeft: '2.5rem' }}
              aria-label="Search graphics portfolio"
            />
          </div>

          <div className="flex min-w-0 items-center gap-2 overflow-x-auto rounded-full border border-[#e2e8f0] bg-white p-1.5">
            <Filter className="ml-2 h-4 w-4 shrink-0 text-[#e07b0f]" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? 'whitespace-nowrap rounded-full border border-[#e07b0f] bg-[#e07b0f] px-3 py-1.5 text-[12px] font-semibold text-white'
                    : 'whitespace-nowrap rounded-full border border-transparent px-3 py-1.5 text-[12px] font-medium text-[#5b6575] transition-colors hover:bg-[#fdf2e5] hover:text-[#e07b0f]'
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['32', 'Curated projects'],
            ['NGO', 'Institutional apparel'],
            ['DTF', 'Transfer production'],
            ['Print', 'Physical production'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[20px] border border-[#e2e8f0] bg-[#f5f5f7] p-4">
              <div className="text-[22px] font-semibold tracking-[-0.02em] text-[#0c791e]">{value}</div>
              <div className="mt-1 text-[11px] font-medium text-[#5b6575]">{label}</div>
            </div>
          ))}
        </div>

        {activeCategory === 'All' && !query && (
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="ds-eyebrow ds-eyebrow--plain text-[11px]">Selected work</div>
                <h3 className="mt-1 text-[20px] font-medium tracking-[-0.01em] text-[#111827]">
                  Featured production plates
                </h3>
              </div>
              <span className="text-[12px] text-[#8a93a1]">{featured.length} highlighted projects</span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  failed={imageFailed[item.id]}
                  onError={() => markImageFailed(item.id)}
                  onOpen={() => setSelected(item)}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="ds-eyebrow ds-eyebrow--plain text-[11px]">Complete catalog</div>
              <h3 className="mt-1 text-[20px] font-medium tracking-[-0.01em] text-[#111827]">
                {filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'}
              </h3>
            </div>
            <div className="hidden text-right text-[12px] text-[#8a93a1] sm:block">
              Click any project to inspect its role, context and production methods.
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                failed={imageFailed[item.id]}
                onError={() => markImageFailed(item.id)}
                onOpen={() => setSelected(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#111827]/55 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white shadow-[0_30px_80px_rgba(17,24,39,0.3)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] p-5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#e07b0f]">{selected.category}</div>
                <h3 className="mt-1 text-[20px] font-semibold text-[#111827] sm:text-[24px]">{selected.title}</h3>
                <p className="mt-1 text-[13px] text-[#5b6575]">{selected.context}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e2e8f0] text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                aria-label="Close project"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid max-h-[calc(92vh-90px)] overflow-y-auto lg:grid-cols-[1.35fr_1fr]">
              <div className="flex min-h-[300px] items-center justify-center bg-[#f5f5f7] p-3 sm:p-6">
                {imageFailed[selected.id] ? (
                  <MissingImage />
                ) : (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="max-h-[65vh] w-full rounded-2xl object-contain"
                    onError={() => markImageFailed(selected.id)}
                  />
                )}
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#e07b0f]">Role</div>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#3f4a5a]">{selected.role}</p>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#e07b0f]">Project description</div>
                  <p className="mt-2 text-[13px] leading-[1.75] text-[#3f4a5a]">{selected.description}</p>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#e07b0f]">Production methods</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.methods.map((method) => (
                      <span
                        key={method}
                        className="rounded-full border border-[#e2e8f0] bg-[#f5f5f7] px-2.5 py-1.5 text-[12px] font-medium text-[#3f4a5a]"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                {selected.note && (
                  <div className="rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] p-3 text-[12px] leading-[1.6] text-[#8a5a1f]">
                    {selected.note}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const PortfolioCard: React.FC<{
  item: GraphicsPortfolioItem;
  failed?: boolean;
  onError: () => void;
  onOpen: () => void;
}> = ({ item, failed, onError, onOpen }) => (
  <article className="ds-card ds-card--hover group overflow-hidden">
    <button onClick={onOpen} className="block w-full text-left">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f7]">
        {failed ? (
          <MissingImage />
        ) : (
          <>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={onError}
            />
            <div className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#a85c0b] shadow-sm backdrop-blur">
              {item.category}
            </div>
            <div className="absolute bottom-3 right-3 rounded-full bg-white/95 p-2 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-4 w-4 text-[#e07b0f]" />
            </div>
          </>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a93a1]">{item.context}</div>
          <h4 className="mt-1 text-[15px] font-semibold text-[#111827] transition-colors group-hover:text-[#e07b0f]">
            {item.title}
          </h4>
        </div>
        <p className="line-clamp-2 text-[12px] leading-[1.6] text-[#5b6575]">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.methods.slice(0, 3).map((method) => (
            <span key={method} className="ds-tag">
              {method}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-3 text-[11px] text-[#8a93a1]">
          <span>{item.role}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[#e07b0f]" />
        </div>
      </div>
    </button>
  </article>
);

const MissingImage: React.FC = () => (
  <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center bg-[#f5f5f7] text-center">
    <ImageOff className="h-8 w-8 text-[#c3cad4]" />
    <p className="mt-3 text-[12px] font-medium text-[#5b6575]">Production image pending upload</p>
    <p className="mt-1 max-w-[220px] text-[10px] leading-4 text-[#8a93a1]">
      The portfolio entry is ready; the source image will populate this plate when uploaded.
    </p>
  </div>
);
