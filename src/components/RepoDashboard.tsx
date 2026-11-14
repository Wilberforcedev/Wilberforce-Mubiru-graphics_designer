import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Search,
  Star,
  GitFork,
  FileCode,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Terminal,
  Clock,
  Layers,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import { CodeRepository } from '../types';

interface RepoDashboardProps {
  repositories: CodeRepository[];
}

export const RepoDashboard: React.FC<RepoDashboardProps> = ({ repositories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars');
  const [starredMap, setStarredMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('portfolio_starred_repos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeRepoModal, setActiveRepoModal] = useState<CodeRepository | null>(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedCloneId, setCopiedCloneId] = useState<string | null>(null);

  // Toggle star
  const handleToggleStar = (repoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredMap((prev) => {
      const next = { ...prev, [repoId]: !prev[repoId] };
      try {
        localStorage.setItem('portfolio_starred_repos', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const copyCloneCmd = (repo: CodeRepository, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${repo.cloneUrl}`);
    setCopiedCloneId(repo.id);
    setTimeout(() => setCopiedCloneId(null), 2000);
  };

  // Filter & Sort Repositories
  const filteredRepos = useMemo(() => {
    return repositories
      .filter((repo) => {
        const matchesSearch =
          searchQuery.trim() === '' ||
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLang =
          selectedLanguage === 'all' || repo.primaryLanguage.toLowerCase() === selectedLanguage.toLowerCase();

        const matchesCat =
          selectedCategory === 'all' || repo.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesLang && matchesCat;
      })
      .sort((a, b) => {
        const aStarred = starredMap[a.id] ? 1 : 0;
        const bStarred = starredMap[b.id] ? 1 : 0;
        const aEffectiveStars = a.stars + aStarred;
        const bEffectiveStars = b.stars + bStarred;

        if (sortBy === 'stars') return bEffectiveStars - aEffectiveStars;
        if (sortBy === 'forks') return b.forks - a.forks;
        return 0; // default initial order
      });
  }, [repositories, searchQuery, selectedLanguage, selectedCategory, sortBy, starredMap]);

  // Aggregate stats
  const totalStars = useMemo(() => {
    return repositories.reduce((acc, r) => acc + r.stars + (starredMap[r.id] ? 1 : 0), 0);
  }, [repositories, starredMap]);

  const totalForks = useMemo(() => {
    return repositories.reduce((acc, r) => acc + r.forks, 0);
  }, [repositories]);

  const filterBase =
    'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors';
  const filterIdle = 'border-[#e2e8f0] bg-white text-[#3f4a5a] hover:border-[#e07b0f] hover:text-[#e07b0f]';
  const filterActive = 'border-[#e07b0f] bg-[#e07b0f] text-white';

  return (
    <section id="repositories" className="ds-section ds-section--panel">
      <div className="ds-shell">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="ds-eyebrow mb-4">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Open-Source &amp; Production Codebases</span>
            </div>
            <h2 className="ds-h2">Code Repositories Dashboard</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#5b6575]">
              Explore production architectures, anti-bot evasion engines, agentic RAG frameworks, and high-concurrency automation tools with in-browser source code inspection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start rounded-full border border-[#e2e8f0] bg-white p-1.5 text-[12px] md:self-auto">
            <div className="flex items-center gap-1.5 rounded-full border border-[#f7e3b8] bg-[#fdf6e7] px-2.5 py-1 font-medium text-[#9a6a05]">
              <Star className="h-3.5 w-3.5 fill-[#d9a419] text-[#d9a419]" />
              <span>{totalStars.toLocaleString()} Stars</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2.5 py-1 font-medium text-[#0c791e]">
              <GitFork className="h-3.5 w-3.5" />
              <span>{totalForks.toLocaleString()} Forks</span>
            </div>
            <div className="hidden items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f5f5f7] px-2.5 py-1 font-medium text-[#3f4a5a] sm:flex">
              <Layers className="h-3.5 w-3.5 text-[#e07b0f]" />
              <span>{repositories.length} Active Repos</span>
            </div>
          </div>
        </div>

        {/* Search, Language Filters & Sort Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a93a1]" />
              <input
                id="repo-search-input"
                type="text"
                placeholder="Search repositories by name, topic, or keyword (e.g. Akamai, JA4, RAG, Go)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ds-input pl-10"
                style={{ paddingLeft: '2.5rem', paddingRight: searchQuery ? '4rem' : undefined }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#8a93a1] transition-colors hover:text-[#e07b0f]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-[12px] font-medium text-[#3f4a5a]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#8a93a1]" />
              <span>Sort:</span>
              <select
                id="repo-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="cursor-pointer bg-transparent font-semibold text-[#e07b0f] focus:outline-none"
              >
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Language & Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8a93a1]">Language:</span>
            {[
              { id: 'all', label: 'All Languages' },
              { id: 'go', label: 'Go (Golang)', color: '#00ADD8' },
              { id: 'python', label: 'Python', color: '#3572A5' },
              { id: 'typescript', label: 'TypeScript', color: '#3178C6' },
            ].map((lang) => {
              const isActive = selectedLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  id={`repo-lang-filter-${lang.id}`}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`${filterBase} ${isActive ? filterActive : filterIdle}`}
                >
                  {lang.color && (
                    <span
                      className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : ''}`}
                      style={isActive ? undefined : { backgroundColor: lang.color }}
                    />
                  )}
                  <span>{lang.label}</span>
                </button>
              );
            })}

            <div className="mx-2 hidden h-4 w-px bg-[#e2e8f0] sm:block" />

            <span className="mr-1 hidden text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8a93a1] sm:inline">
              Category:
            </span>
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'reverse-engineering', label: 'Reverse Eng' },
              { id: 'ai', label: 'AI & RAG' },
              { id: 'automation', label: 'Automation' },
              { id: 'backend', label: 'Distributed Backend' },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`repo-cat-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${filterBase} ${isActive ? filterActive : filterIdle}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Repositories Grid */}
        {filteredRepos.length === 0 ? (
          <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-12 text-center">
            <FolderGit2 className="mx-auto mb-3 h-10 w-10 text-[#c3cad4]" />
            <h3 className="text-base font-semibold text-[#111827]">No repositories match your filter</h3>
            <p className="mt-1 text-[13px] text-[#5b6575]">Try broadening your search term or clearing filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
                setSelectedCategory('all');
              }}
              className="mt-4 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-[12px] font-semibold text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredRepos.map((repo) => {
              const isStarred = starredMap[repo.id];
              const starCount = repo.stars + (isStarred ? 1 : 0);

              return (
                <div
                  key={repo.id}
                  id={`repo-card-${repo.id}`}
                  className="ds-card ds-card--hover group flex flex-col justify-between p-5"
                >
                  <div>
                    <div className="mb-2.5 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] text-[#e07b0f]">
                          <FolderGit2 className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            onClick={() => {
                              setSelectedFileIndex(0);
                              setActiveRepoModal(repo);
                            }}
                            className="cursor-pointer truncate text-[15px] font-semibold text-[#111827] transition-colors group-hover:text-[#e07b0f]"
                          >
                            {repo.name}
                          </h3>
                          <span className="text-[11px] text-[#8a93a1]">
                            {repo.version} • {repo.license}
                          </span>
                        </div>
                      </div>

                      <button
                        id={`star-btn-${repo.id}`}
                        onClick={(e) => handleToggleStar(repo.id, e)}
                        className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                          isStarred
                            ? 'border-[#f7e3b8] bg-[#fdf6e7] text-[#9a6a05]'
                            : 'border-[#e2e8f0] bg-white text-[#5b6575] hover:border-[#e07b0f] hover:text-[#e07b0f]'
                        }`}
                        title={isStarred ? 'Unstar repository' : 'Star repository'}
                      >
                        <Star className={`h-3.5 w-3.5 ${isStarred ? 'fill-[#d9a419] text-[#d9a419]' : ''}`} />
                        <span>{starCount}</span>
                      </button>
                    </div>

                    <p className="mb-3 line-clamp-2 text-[13px] leading-[1.65] text-[#3f4a5a]">{repo.description}</p>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="ds-tag">
                          #{topic}
                        </span>
                      ))}
                      {repo.topics.length > 4 && (
                        <span className="rounded-full bg-[#f5f5f7] px-2 py-1 text-[10px] font-medium text-[#8a93a1]">
                          +{repo.topics.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2e8f0] pt-3">
                    <div className="flex items-center gap-3 text-[11px] text-[#5b6575]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                        <span className="font-medium text-[#3f4a5a]">{repo.primaryLanguage}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3 text-[#8a93a1]" />
                        <span>{repo.forks}</span>
                      </div>
                      <div className="hidden items-center gap-1 text-[#8a93a1] sm:flex">
                        <Clock className="h-3 w-3" />
                        <span>{repo.updatedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        id={`copy-clone-${repo.id}`}
                        onClick={(e) => copyCloneCmd(repo, e)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                        title="Copy git clone URL"
                      >
                        {copiedCloneId === repo.id ? (
                          <Check className="h-3.5 w-3.5 text-[#0c791e]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>

                      {repo.liveDemoUrl && (
                        <a
                          href={repo.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                          title="View Live Demo"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}

                      <button
                        id={`inspect-repo-${repo.id}`}
                        onClick={() => {
                          setSelectedFileIndex(0);
                          setActiveRepoModal(repo);
                        }}
                        className="flex items-center gap-1.5 rounded-full border border-[#f5dcc1] bg-[#fdf2e5] px-3 py-1.5 text-[12px] font-semibold text-[#e07b0f] transition-colors hover:bg-[#fbe6cc]"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        <span>Inspect Code</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Deep-Dive Repository Code Inspection Modal */}
        {activeRepoModal && (
          <div
            id="repo-inspect-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/50 p-3 backdrop-blur-sm sm:p-6"
            onClick={() => setActiveRepoModal(null)}
          >
            <div
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white shadow-[0_30px_80px_rgba(17,24,39,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] bg-[#faf8f4] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] text-[#e07b0f]">
                    <FolderGit2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-[#111827] sm:text-lg">{activeRepoModal.fullName}</h3>
                      <span className="rounded-full border border-[#d9eadc] bg-[#eef7ef] px-2 py-0.5 text-[10px] font-semibold text-[#0c791e]">
                        {activeRepoModal.version}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[12px] text-[#5b6575]">{activeRepoModal.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyCloneCmd(activeRepoModal)}
                    className="hidden items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f] sm:flex"
                  >
                    {copiedCloneId === activeRepoModal.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#0c791e]" />
                        <span className="text-[#0c791e]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>git clone</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveRepoModal(null)}
                    aria-label="Close"
                    className="rounded-full border border-[#e2e8f0] bg-white px-2.5 py-1 text-sm text-[#5b6575] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-2 rounded-xl border border-[#f5dcc1] bg-[#fdf2e5] p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a85c0b]">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>SYSTEM ARCHITECTURE OVERVIEW</span>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-[#5a4630]">{activeRepoModal.architectureOverview}</p>
                </div>

                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5b6575]">
                    Key Engineering Features:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-[12px] text-[#3f4a5a] sm:grid-cols-2">
                    {activeRepoModal.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 rounded-lg border border-[#e2e8f0] bg-[#f5f5f7] p-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0c791e]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Explorer Window */}
                <div className="overflow-hidden rounded-xl border border-[#1e293b] bg-[#0f172a]">
                  <div className="flex items-center justify-between overflow-x-auto border-b border-[#1e293b] bg-[#111c33] px-3 py-2">
                    <div className="flex items-center gap-1">
                      {activeRepoModal.files.map((file, idx) => (
                        <button
                          key={file.filename}
                          onClick={() => setSelectedFileIndex(idx)}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-mono transition-colors ${
                            selectedFileIndex === idx
                              ? 'border border-[#e07b0f]/40 bg-[#e07b0f]/15 text-[#f5c98a]'
                              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                          }`}
                        >
                          <FileCode className="h-3.5 w-3.5 text-[#7dd3fc]" />
                          <span>{file.filename}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pl-3 text-[10px] font-mono text-slate-500">
                      {activeRepoModal.files[selectedFileIndex]?.language.toUpperCase()}
                    </div>
                  </div>

                  <div className="max-h-72 overflow-x-auto p-4 text-[12px] font-mono leading-relaxed text-slate-200">
                    <pre>
                      <code>{activeRepoModal.files[selectedFileIndex]?.code}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-3 border-t border-[#e2e8f0] bg-white p-4 text-[11px]">
                <div className="flex min-w-0 items-center gap-2 text-[#5b6575]">
                  <Terminal className="h-3.5 w-3.5 shrink-0 text-[#e07b0f]" />
                  <span className="truncate">clone: git clone {activeRepoModal.cloneUrl}</span>
                </div>
                <button
                  onClick={() => setActiveRepoModal(null)}
                  className="shrink-0 rounded-full border border-[#e2e8f0] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#3f4a5a] transition-colors hover:border-[#e07b0f] hover:text-[#e07b0f]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
