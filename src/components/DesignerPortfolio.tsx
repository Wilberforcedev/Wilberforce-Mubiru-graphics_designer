import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Instagram, Linkedin, Mail, MapPin, MessageCircle, Palette, Printer, Shapes } from 'lucide-react';

const projects = [
  { title: 'Development partner apparel', type: 'Branding & apparel', image: '/images/belgium_plan.jpg', alt: 'Plan International and Belgium partner branded apparel', note: 'Co-branded field and event wear' },
  { title: 'Field team visibility', type: 'Campaign & apparel', image: '/images/oxfam_ireland.jpg', alt: 'Oxfam Ireland branded field apparel', note: 'Clear, practical identity for field teams' },
  { title: 'Humanitarian campaign wear', type: 'Branding & apparel', image: '/images/ukaid_collection.jpg', alt: 'UKaid branded apparel collection', note: 'Campaign identity translated onto apparel' },
  { title: 'Kigorobya community run', type: 'Campaign & events', image: '/images/kigorobya_race_day.jpg', alt: 'Kigorobya Archdeaconry Run event branding', note: 'Event graphics and race-day materials' },
  { title: 'Run-day merchandise', type: 'Campaign & events', image: '/images/kigorobya_merch_display.jpg', alt: 'Kigorobya Run merchandise display', note: 'Branded merchandise for a community event' },
  { title: 'Tusimba fundraising campaign', type: 'Campaign & events', image: '/images/tusimba_fundraising.jpg', alt: 'Tusimba fundraising campaign materials', note: 'Visual communication for a fundraising initiative' },
  { title: 'Community distribution', type: 'Campaign & events', image: '/images/tusimba_distribution.jpg', alt: 'Tusimba community distribution project', note: 'On-the-ground campaign implementation' },
  { title: 'Grassland Guardian', type: 'Campaign & events', image: '/images/grassland_guardian.jpg', alt: 'Grassland Guardian conservation campaign', note: 'Conservation-focused campaign identity' },
];

const services = [
  { icon: Palette, title: 'Graphic design', text: 'Campaign artwork, posters, layouts and social visuals shaped around a clear message.' },
  { icon: Shapes, title: 'Branding', text: 'Logo use, typography and colour systems applied consistently across real materials.' },
  { icon: Printer, title: 'Apparel & print', text: 'Production-aware artwork for branded clothing, event merchandise and printed pieces.' },
];

export default function DesignerPortfolio() {
  const [category, setCategory] = useState('All work');
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ['All work', 'Branding & apparel', 'Campaign & events'];
  const visibleProjects = category === 'All work' ? projects : projects.filter((project) => project.type === category);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-[#fbfaf8] text-[#17211d] selection:bg-[#d7efb0] selection:text-[#17211d]">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/[0.06] bg-white/90 px-4 py-2.5 shadow-[0_12px_40px_rgba(23,33,29,0.06)] backdrop-blur-xl sm:px-6">
          <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#17211d] text-sm font-bold tracking-tight text-white">WM</span>
            <span className="leading-tight"><span className="block text-sm font-semibold">Wilberforce Mubiru</span><span className="block text-[10px] uppercase tracking-[0.16em] text-[#758078]">Graphic designer</span></span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            <a className="text-sm text-[#536058] transition hover:text-[#17211d]" href="#work">Selected work</a>
            <a className="text-sm text-[#536058] transition hover:text-[#17211d]" href="#services">What I do</a>
            <a className="text-sm text-[#536058] transition hover:text-[#17211d]" href="#about">About</a>
            <a className="rounded-full bg-[#d7efb0] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#c7e49a]" href="#contact">Let’s talk <ArrowUpRight className="ml-1 inline h-4 w-4" /></a>
          </div>
          <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="grid h-10 w-10 place-items-center rounded-full border border-black/10 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </nav>
        {menuOpen && <div className="mx-3 mt-2 grid gap-1 rounded-3xl border border-black/[0.06] bg-white p-3 shadow-xl md:hidden"><a onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm" href="#work">Selected work</a><a onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm" href="#services">What I do</a><a onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm" href="#about">About</a><a onClick={closeMenu} className="rounded-xl bg-[#d7efb0] px-4 py-3 text-sm font-semibold" href="#contact">Let’s talk</a></div>}
      </header>

      <main id="home">
        <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:min-h-[760px] lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:pb-24">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8e5d3] bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4a6750]"><span className="h-2 w-2 rounded-full bg-[#78a866]" /> Kampala, Uganda · Available for projects</div>
            <p className="mb-4 text-sm font-medium tracking-wide text-[#66746a]">Thoughtful visuals. Made to work in the real world.</p>
            <h1 className="max-w-3xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[.9] tracking-[-0.075em]">Design with<br /><span className="font-serif font-normal italic text-[#809d65]">a purpose.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#5e6961] sm:text-lg">I’m Wilberforce, a graphic designer creating clear, characterful visuals for brands, campaigns and community projects—from the first idea to the final printed piece.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3"><a href="#work" className="rounded-full bg-[#17211d] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#30463a]">Explore selected work <ArrowDown className="ml-2 inline h-4 w-4" /></a><a href="https://wa.me/256755943973" target="_blank" rel="noreferrer" className="rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold transition hover:border-[#809d65]">Start a conversation <ArrowUpRight className="ml-1 inline h-4 w-4" /></a></div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#657169]"><span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#809d65]" /> Kampala, Uganda</span><span>Branding · Campaigns · Print</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -right-7 -top-8 h-36 w-36 rounded-full bg-[#d7efb0] sm:-right-10 sm:-top-10 sm:h-48 sm:w-48" />
            <div className="absolute -bottom-8 -left-7 h-32 w-32 rounded-full border border-[#c4d3b6] sm:-bottom-10 sm:-left-10 sm:h-40 sm:w-40" />
            <div className="relative grid grid-cols-[1.05fr_.95fr] grid-rows-[220px_210px] gap-3 sm:grid-rows-[300px_250px]">
              <div className="row-span-2 overflow-hidden rounded-[2rem] bg-[#e9e8e1]"><img src="/images/belgium_plan.jpg" alt="Branded apparel for a development partner" className="h-full w-full object-cover" fetchPriority="high" /></div>
              <div className="overflow-hidden rounded-[2rem] bg-[#e7ede1]"><img src="/images/kigorobya_merch_display.jpg" alt="Community event merchandise designed for the Kigorobya Run" className="h-full w-full object-cover" /></div>
              <div className="relative overflow-hidden rounded-[2rem] bg-[#e7e1d7]"><img src="/images/oxfam_ireland.jpg" alt="Field apparel with clear NGO branding" className="h-full w-full object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#29342d]">Selected projects · 2023–26</span></div>
            </div>
            <div className="absolute -left-3 top-8 hidden -rotate-6 rounded-full bg-white px-4 py-2 text-xs font-semibold shadow-lg sm:block">Ideas into identity ✳</div>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 border-y border-black/[0.06] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#809d65]">A few things I’ve made</p><h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Selected work<span className="text-[#809d65]">.</span></h2></div>
              <p className="max-w-md text-sm leading-7 text-[#667169]">A collection of campaign, apparel and brand work built for people to see, use and remember.</p>
            </div>
            <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'rounded-full bg-[#17211d] px-4 py-2.5 text-xs font-semibold text-white' : 'rounded-full border border-black/10 px-4 py-2.5 text-xs font-medium text-[#5e6961] transition hover:border-[#809d65]'}>{item}</button>)}</div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProjects.map((project, index) => <article key={project.title} className="group"><div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[#f0f0ec]"><img src={project.image} alt={project.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.11em]">{project.type}</span><span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#d7efb0] opacity-0 transition group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span></div><div className="flex items-start justify-between gap-4 px-1 pt-4"><div><h3 className="text-lg font-semibold tracking-tight">{project.title}</h3><p className="mt-1 text-sm text-[#778179]">{project.note}</p></div><span className="pt-1 text-xs text-[#9aa29b]">0{index + 1}</span></div></article>)}</div>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#809d65]">How I can help</p><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="max-w-xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">From first sketch<br />to finished piece.</h2><p className="max-w-md text-sm leading-7 text-[#667169]">Good design has to communicate clearly and make sense wherever it lands—in a feed, on a shirt or in someone’s hands.</p></div><div className="grid gap-4 md:grid-cols-3">{services.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-[1.6rem] border border-black/[0.07] bg-white p-6 sm:p-8"><div className="mb-10 flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eef3e9] text-[#607d4d]"><Icon className="h-5 w-5" /></span><span className="text-xs text-[#98a198]">0{index + 1}</span></div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#68736b]">{text}</p></article>)}</div></div></section>

        <section id="about" className="scroll-mt-28 bg-[#17211d] py-20 text-white sm:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#c1dd9d]">A little about me</p><h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Made with care.<br /><span className="font-serif font-normal italic text-[#c1dd9d]">Made to matter.</span></h2></div><div className="max-w-2xl"><p className="text-lg leading-8 text-white/75">I’m a Kampala-based graphic designer who enjoys helping people and organisations bring their ideas to life. My work spans visual identity, campaign communication, branded apparel and print—always with an eye for clarity, colour and how the final design will be used.</p><p className="mt-5 text-base leading-8 text-white/60">I value thoughtful collaboration, careful artwork preparation and designs that stay useful beyond the screen.</p><a href="https://www.instagram.com/willinho23" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#c1dd9d] hover:text-white">Follow the work <Instagram className="h-4 w-4" /><ArrowUpRight className="h-4 w-4" /></a></div></div></section>

        <section id="contact" className="scroll-mt-28 bg-[#e9f0e1] py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#668453]">Have a project in mind?</p><h2 className="max-w-2xl text-5xl font-semibold leading-[.98] tracking-[-0.06em] sm:text-7xl">Let’s make<br />something <span className="font-serif font-normal italic text-[#6d8b57]">meaningful.</span></h2><p className="mt-6 max-w-lg text-base leading-8 text-[#5e6961]">Tell me a little about what you’re working on. I’d love to hear about it.</p></div><div className="space-y-3"><a href="https://wa.me/256755943973" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-[#17211d] p-5 text-white transition hover:bg-[#30463a]"><span className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-[#c1dd9d]" /> WhatsApp · +256 755 943 973</span><ArrowUpRight className="h-5 w-5" /></a><a href="mailto:wilberofficial2001@gmail.com" className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-5 transition hover:border-[#809d65]"><span className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#6d8b57]" /> wilberofficial2001@gmail.com</span><ArrowUpRight className="h-5 w-5" /></a><a href="https://www.linkedin.com/in/wilberforce-mubiru-217b49211/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-[#536058] hover:text-[#17211d]"><Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5" /></a></div></div></section>
      </main>
      <footer className="flex flex-col items-center justify-between gap-3 bg-[#17211d] px-5 py-7 text-xs text-white/60 sm:flex-row sm:px-8"><a href="#home" className="font-semibold text-white">Wilberforce Mubiru <span className="font-normal text-white/50">· Graphic Designer</span></a><p>Based in Kampala, Uganda · © {new Date().getFullYear()}</p><a href="#home" className="hover:text-white">Back to top ↑</a></footer>
    </div>
  );
}
