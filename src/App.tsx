import {useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Calculator,
  ChevronRight,
  Cpu,
  ExternalLink,
  Eye,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Mic,
  Minimize2,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import {
  AWARDS_LIST,
  CERTIFICATION_LIST,
  EDUCATION_LIST,
  HERO_METRICS,
  LEADERSHIP_EXPERIENCE,
  PORTFOLIO_PROJECTS,
  PROFILE,
  SPEAKER_TOPICS,
  TEACHING_EXPERIENCE,
  type PortfolioProject,
} from './data/cvData';
import {useAnalytics} from './hooks/useAnalytics';
import {MathVisualizer} from './components/MathVisualizer';
import {ProjectCardVisual} from './components/ProjectCardVisual';
import {ProjectModal} from './components/ProjectModal';
import {AnalyticsSection} from './components/AnalyticsSection';

const NAV_ITEMS = [
  {href: '#tentang', label: 'Tentang'},
  {href: '#portofolio', label: 'Portofolio'},
  {href: '#rekam-jejak', label: 'Rekam Jejak'},
  {href: '#narasumber', label: 'Narasumber'},
  {href: '#analitik', label: 'Analitik'},
];

const SECTION_IDS = [
  'beranda',
  'tentang',
  'portofolio',
  'rekam-jejak',
  'prestasi',
  'narasumber',
  'analitik',
  'kontak',
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fullscreenNotice, setFullscreenNotice] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [portraitFailed, setPortraitFailed] = useState<boolean>(false);

  const {analytics, trackProjectClick, trackFilterChange, setActiveSection, resetAnalytics} =
    useAnalytics();

  // Automatic category extraction from projects list
  const categories = useMemo(() => {
    const unique = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)));
    return ['Semua', ...unique];
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {Semua: PORTFOLIO_PROJECTS.length};
    PORTFOLIO_PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Semua') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Sync theme to documentElement & localStorage
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try {
        localStorage.setItem('cv-theme', next ? 'dark' : 'light');
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Fullscreen toggle with event listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    setFullscreenNotice(null);
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setFullscreenNotice('Mode layar penuh dibatasi oleh peramban atau bingkai pratinjau.');
      window.setTimeout(() => setFullscreenNotice(null), 3500);
    }
  };

  // Scroll spy for active section tracking
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [setActiveSection]);

  const handleOpenProject = (project: PortfolioProject) => {
    setActiveProject(project);
    trackProjectClick(project.id, project.title);
  };

  const handleOpenProjectById = (projectId: string) => {
    const found = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (found) handleOpenProject(found);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    trackFilterChange(category);
  };

  return (
    <div className="min-h-screen bg-[#fff6f8] dark:bg-[#040814] text-[#1e1018] dark:text-slate-100 transition-colors duration-200">
      {/* TOP BAR — 3-Zone Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#fff6f8]/90 dark:bg-[#040814]/90 backdrop-blur-md border-b border-rose-200/70 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#beranda"
            className="font-heading text-base sm:text-lg font-bold tracking-tight text-[#1e1018] dark:text-white whitespace-nowrap shrink-0"
          >
            {PROFILE.name}
          </a>

          {/* Zone 2: Concise Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#5b3e4e] dark:text-slate-300">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = analytics.activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-rose-700 text-rose-800 dark:border-sky-400 dark:text-sky-300 font-semibold'
                      : 'border-transparent hover:text-rose-800 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme, Fullscreen, Primary Action & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Ubah ke Mode Terang Pink' : 'Ubah ke Mode Gelap Navy'}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
              className="p-2 rounded-lg border border-rose-200/80 dark:border-slate-700 bg-white/80 dark:bg-[#0b132b] hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-rose-700" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Keluar dari Mode Layar Penuh' : 'Masuk ke Mode Layar Penuh'}
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
              className="p-2 rounded-lg border border-rose-200/80 dark:border-slate-700 bg-white/80 dark:bg-[#0b132b] hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-rose-700 dark:text-sky-400" />
              ) : (
                <Maximize2 className="w-4 h-4 text-rose-700 dark:text-sky-400" />
              )}
            </button>

            <a
              href="#kontak"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-rose-700 hover:bg-rose-800 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Hubungi Saya
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="lg:hidden p-2 rounded-lg text-[#1e1018] dark:text-slate-200 hover:bg-rose-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{opacity: 0, y: -8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.16}}
              className="lg:hidden bg-white dark:bg-[#0b132b] border-b border-rose-200 dark:border-slate-800 px-4 py-4 space-y-2 shadow-lg"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#1e1018] dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-center bg-rose-700 text-white dark:bg-sky-500 dark:text-slate-950"
              >
                Hubungi Saya
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="beranda"
          className="relative math-grid-canvas pt-12 pb-16 lg:pt-16 lg:pb-20 px-4 sm:px-6 lg:px-8 border-b border-rose-200/70 dark:border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy & Controls */}
              <motion.div
                className="lg:col-span-7 flex flex-col justify-between space-y-6"
                initial={{opacity: 0, y: 14}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
              >
                <div className="space-y-5">
                  <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                    {PROFILE.role} · {PROFILE.school} · {PROFILE.location}
                  </p>

                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance text-[#1e1018] dark:text-white">
                    Transformasi Pembelajaran Matematika Berbasis Teknologi Digital
                  </h1>

                  <p className="text-base sm:text-lg leading-relaxed text-[#4b3140] dark:text-slate-300 max-w-2xl">
                    M. Faisal Abduh, M.Pd. — Pendidik matematika, Wakil Kepala Sekolah Bidang Kurikulum, trainer sertifikasi teknologi pendidikan, dan Fasilitator Daerah Literasi Numerasi Jawa Tengah.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-[#5b3e4e] dark:text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-rose-700 dark:text-sky-400" />
                      {PROFILE.email}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-700 dark:text-sky-400" />
                      {PROFILE.location}
                    </span>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#portofolio"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-rose-700 hover:bg-rose-800 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Jelajahi Portofolio</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#rekam-jejak"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-rose-300 dark:border-slate-700 bg-white/90 dark:bg-[#0b132b] hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Lihat Rekam Jejak</span>
                    </a>

                    <a
                      href="#analitik"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border border-rose-200 dark:border-slate-700 bg-white/90 dark:bg-[#0b132b] hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-rose-700 dark:text-sky-400" />
                      <span className="font-mono tabular-nums">
                        {analytics.totalVisits} Kunjungan · {analytics.activeTabs} Aktif
                      </span>
                    </a>
                  </div>

                  {fullscreenNotice && (
                    <p className="text-xs font-medium text-rose-700 dark:text-amber-300">
                      {fullscreenNotice}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Right Column: Profile Card + Interactive Math Lab */}
              <motion.div
                className="lg:col-span-5 flex flex-col"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
              >
                <div className="h-full rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/90 dark:border-sky-500/20 p-6 sm:p-7 flex flex-col justify-between gap-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-rose-200 dark:border-slate-700 bg-rose-100 dark:bg-[#101b36] flex items-center justify-center">
                      {!portraitFailed ? (
                        <img
                          src={PROFILE.photoUrl}
                          alt={PROFILE.name}
                          referrerPolicy="no-referrer"
                          onError={() => setPortraitFailed(true)}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span className="font-heading text-2xl font-bold text-rose-800 dark:text-sky-300">
                          {PROFILE.initials}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-heading text-lg sm:text-xl font-bold truncate">
                        {PROFILE.name}
                      </h2>
                      <p className="text-sm font-medium text-rose-700 dark:text-sky-400">
                        {PROFILE.role} · ASN & Edukreator
                      </p>
                      <p className="text-xs text-[#5b3e4e] dark:text-slate-400 mt-0.5 truncate">
                        {PROFILE.lynkLabel} · {PROFILE.instagramHandle}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Math & EdTech Simulation */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#5b3e4e] dark:text-slate-400">
                      <span className="font-semibold text-[#1e1018] dark:text-slate-200">
                        Eksplorasi Visual Matematika
                      </span>
                      <span className="font-mono">∑ · ∫ · f(x)</span>
                    </div>
                    <MathVisualizer compact />
                  </div>

                  {/* Academic Summary */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-rose-100 dark:border-slate-800 text-xs">
                    <div>
                      <p className="text-[#5b3e4e] dark:text-slate-400">Unit Kerja Aktif</p>
                      <p className="font-semibold mt-0.5">{PROFILE.school}</p>
                    </div>
                    <div>
                      <p className="text-[#5b3e4e] dark:text-slate-400">Kualifikasi Akademik</p>
                      <p className="font-semibold mt-0.5">S-2 Pendidikan Matematika</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column KPI Strip Below Hero Split */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {HERO_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800"
                >
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-rose-700 dark:text-sky-400 tabular-nums">
                    {metric.value}
                  </p>
                  <p className="font-heading text-sm font-bold mt-1">{metric.label}</p>
                  <p className="text-xs text-[#5b3e4e] dark:text-slate-400 mt-0.5">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TENTANG SAYA */}
        <section id="tentang" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                Profil Singkat & Filosofi Pendidik
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Tentang Saya
              </h2>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 p-7 sm:p-10">
              <blockquote className="text-lg sm:text-xl leading-relaxed text-[#2d1a24] dark:text-slate-200 font-medium">
                “{PROFILE.quote}”
              </blockquote>

              <div className="mt-8 pt-6 border-t border-rose-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-heading font-bold">{PROFILE.name}</p>
                  <p className="text-xs text-[#5b3e4e] dark:text-slate-400">
                    {PROFILE.role} · Waka Kurikulum {PROFILE.school}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-rose-700 dark:text-sky-400">
                  <a
                    href={PROFILE.lynkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>{PROFILE.lynkLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={PROFILE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>{PROFILE.instagramHandle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTOFOLIO PROYEK INTERAKTIF + FILTER KATEGORI OTOMATIS */}
        <section
          id="portofolio"
          className="py-20 px-4 sm:px-6 lg:px-8 math-dot-canvas border-y border-rose-200/70 dark:border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                  Karya & Inovasi Digitalisasi Pembelajaran
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                  Portofolio Proyek Interaktif
                </h2>
                <p className="text-sm text-[#5b3e4e] dark:text-slate-400 mt-1.5 max-w-2xl">
                  Klik setiap kartu karya untuk membuka rincian konsep matematika, perangkat digital, serta simulasi interaktif.
                </p>
              </div>

              {/* Automatic Category Filter Controls */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/95 dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800"
                role="tablist"
                aria-label="Filter kategori portofolio"
              >
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleCategorySelect(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                        active
                          ? 'bg-rose-700 text-white dark:bg-sky-500 dark:text-slate-950'
                          : 'text-[#5b3e4e] dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat} ({categoryCounts[cat] || 0})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Grid / Bento Layout */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const isHeroCard = selectedCategory === 'Semua' && index === 0;
                  const views = analytics.projectViews[project.id] || 0;

                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{opacity: 0, scale: 0.97}}
                      animate={{opacity: 1, scale: 1}}
                      exit={{opacity: 0, scale: 0.96}}
                      transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                      className={`group rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/90 dark:border-slate-800 hover:border-rose-400 dark:hover:border-sky-400/60 transition-colors flex flex-col justify-between p-5 sm:p-6 ${
                        isHeroCard ? 'lg:col-span-2' : ''
                      }`}
                    >
                      <div>
                        <button
                          type="button"
                          onClick={() => handleOpenProject(project)}
                          className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:focus-visible:ring-sky-400 rounded-xl"
                        >
                          <ProjectCardVisual type={project.visualType} />

                          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#5b3e4e] dark:text-slate-400">
                            <span className="font-semibold text-rose-700 dark:text-sky-400">
                              {project.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{project.year}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.institution}</span>
                          </div>

                          <h3 className="font-heading text-lg sm:text-xl font-bold mt-2 group-hover:text-rose-700 dark:group-hover:text-sky-300 transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-sm leading-relaxed text-[#4b3140] dark:text-slate-300 mt-2">
                            {project.summary}
                          </p>
                        </button>
                      </div>

                      <div className="mt-5 pt-4 border-t border-rose-100 dark:border-slate-800 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono tabular-nums text-[#5b3e4e] dark:text-slate-400">
                          <Eye className="w-3.5 h-3.5 text-rose-700 dark:text-sky-400" />
                          {views} kali dibuka
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-sky-400 hover:underline cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>Detail Interaktif</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* REKAM JEJAK: PENDIDIKAN, SERTIFIKASI, KEMAMPUAN, MENGAJAR & JABATAN */}
        <section id="rekam-jejak" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* 1. Pendidikan & Kemampuan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Pendidikan */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                    Rekam Jejak Akademik
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                    Pendidikan Formal
                  </h2>
                </div>

                <div className="space-y-4">
                  {EDUCATION_LIST.map((edu) => (
                    <div
                      key={edu.major}
                      className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-[#101b36] text-rose-700 dark:text-sky-400 shrink-0">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-rose-700 dark:text-sky-400">
                              {edu.level} · {edu.period}
                            </p>
                            <h3 className="font-heading text-lg font-bold mt-0.5">
                              {edu.institution}
                            </h3>
                            <p className="text-sm text-[#5b3e4e] dark:text-slate-300 mt-0.5">
                              {edu.major}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-bold text-rose-800 dark:text-sky-300 tabular-nums shrink-0">
                          IPK {edu.gpa}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kemampuan Inti */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                    Kompetensi Utama
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                    Kemampuan Profesional
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-[#101b36] text-rose-700 dark:text-sky-400 shrink-0">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">Pendidikan Matematika</h3>
                      <p className="text-sm leading-relaxed text-[#4b3140] dark:text-slate-300 mt-1">
                        Metodologi pengajaran matematika SMA, penyusunan kurikulum inovatif, penalaran logis, serta pengembangan kompetensi literasi numerasi peserta didik.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-[#101b36] text-rose-700 dark:text-sky-400 shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">Teknologi Pembelajaran</h3>
                      <p className="text-sm leading-relaxed text-[#4b3140] dark:text-slate-300 mt-1">
                        Pemanfaatan Microsoft Office 365, Google Workspace for Education, Platform Merdeka Mengajar (PMM), Assemblr 3D/AR, Canva, YouTube, dan Edpuzzle untuk pembelajaran interaktif.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Sertifikasi */}
            <div>
              <div className="mb-8">
                <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                  Kualifikasi & Lisensi
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                  Sertifikasi Profesional
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {CERTIFICATION_LIST.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#5b3e4e] dark:text-slate-400 mb-3">
                        <span>{cert.issuer}</span>
                        <span className="font-mono font-semibold text-rose-700 dark:text-sky-400 tabular-nums">
                          {cert.year}
                        </span>
                      </div>
                      <h3 className="font-heading text-base sm:text-lg font-bold leading-snug">
                        {cert.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#5b3e4e] dark:text-slate-400 mt-4 pt-3 border-t border-rose-100 dark:border-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-700 dark:text-sky-400 shrink-0" />
                      <span>{cert.focus}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Pengalaman Mengajar & Jabatan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Pengalaman Mengajar */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                    Dedikasi Pendidikan
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                    Pengalaman Mengajar
                  </h2>
                </div>

                <div className="space-y-4">
                  {TEACHING_EXPERIENCE.map((item) => (
                    <div
                      key={item.school}
                      className={`p-5 rounded-2xl border ${
                        item.active
                          ? 'bg-rose-50/80 dark:bg-[#0f1d3d] border-rose-300 dark:border-sky-500/40'
                          : 'bg-white dark:bg-[#0b132b] border-rose-200/80 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-mono font-semibold text-rose-700 dark:text-sky-400 tabular-nums">
                          {item.period}
                        </span>
                        {item.active && (
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            Aktif
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-base sm:text-lg font-bold mt-1.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-rose-700 dark:text-sky-400 shrink-0" />
                        <span>{item.school}</span>
                      </h3>
                      <p className="text-sm text-[#5b3e4e] dark:text-slate-300 mt-1">{item.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pengalaman & Jabatan */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                    Kepemimpinan & Organisasi
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                    Pengalaman & Jabatan
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LEADERSHIP_EXPERIENCE.map((exp, idx) => (
                    <div
                      key={`${exp.role}-${exp.organization}`}
                      className={`p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 ${
                        idx === LEADERSHIP_EXPERIENCE.length - 1 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-[#5b3e4e] dark:text-slate-400">
                        <span className="font-mono tabular-nums">{exp.period}</span>
                        {exp.active && (
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            Aktif
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-base font-bold mt-1.5 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-rose-700 dark:text-sky-400 shrink-0" />
                        <span>{exp.role}</span>
                      </h3>
                      <p className="text-xs font-semibold text-rose-700 dark:text-sky-400 mt-0.5">
                        {exp.organization}
                      </p>
                      <p className="text-xs leading-relaxed text-[#5b3e4e] dark:text-slate-300 mt-2">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRESTASI */}
        <section
          id="prestasi"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ffedf2]/75 dark:bg-[#070f23] border-y border-rose-200/70 dark:border-slate-800/80"
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                Penghargaan & Apresiasi
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Prestasi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AWARDS_LIST.map((award) => (
                <div
                  key={award.title}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/90 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-[#101b36] text-rose-700 dark:text-sky-400">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#5b3e4e] dark:text-slate-400 tabular-nums">
                        Tahun {award.year}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-rose-700 dark:text-sky-400">
                      {award.rank}
                    </p>
                    <h3 className="font-heading text-lg font-bold mt-1">{award.title}</h3>
                  </div>
                  <p className="text-sm text-[#5b3e4e] dark:text-slate-400 mt-4 pt-3 border-t border-rose-100 dark:border-slate-800">
                    {award.organizer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NARASUMBER */}
        <section id="narasumber" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                Praktisi & Pemateri Workshop
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Pengalaman Narasumber
              </h2>
              <p className="text-sm text-[#5b3e4e] dark:text-slate-400 mt-1.5 max-w-2xl">
                Memfasilitasi Training of Trainers (ToT), pembekalan mahasiswa PPL, dan In-House Training (IHT) di berbagai instansi serta satuan pendidikan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPEAKER_TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-[#101b36] text-rose-700 dark:text-sky-400 shrink-0">
                        <Mic className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-rose-700 dark:text-sky-400 tabular-nums">
                        {topic.years}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold leading-snug">
                      {topic.title}
                    </h3>
                    {topic.subtitle && (
                      <p className="text-xs text-[#5b3e4e] dark:text-slate-400 mt-1">
                        {topic.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-rose-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-[#5b3e4e] dark:text-slate-400 mb-1.5">
                      Institusi & Sekolah Sasaran:
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#2d1a24] dark:text-slate-300">
                      {topic.institutions.join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANALITIK PENGUNJUNG REAL-TIME */}
        <AnalyticsSection
          analytics={analytics}
          onReset={resetAnalytics}
          onSelectProject={handleOpenProjectById}
        />

        {/* KONTAK */}
        <section id="kontak" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-rose-200/70 dark:border-slate-800/80">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
                Kolaborasi & Undangan Narasumber
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Kontak Saya
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 hover:border-rose-400 dark:hover:border-sky-400/60 transition-colors group"
              >
                <Phone className="w-5 h-5 text-rose-700 dark:text-sky-400 mb-3" />
                <p className="text-xs text-[#5b3e4e] dark:text-slate-400">Telepon / WhatsApp</p>
                <p className="font-heading font-bold mt-1 font-mono tabular-nums group-hover:text-rose-700 dark:group-hover:text-sky-300">
                  {PROFILE.phoneDisplay}
                </p>
              </a>

              <a
                href={`mailto:${PROFILE.email}`}
                className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 hover:border-rose-400 dark:hover:border-sky-400/60 transition-colors group"
              >
                <Mail className="w-5 h-5 text-rose-700 dark:text-sky-400 mb-3" />
                <p className="text-xs text-[#5b3e4e] dark:text-slate-400">Email Resmi</p>
                <p className="font-heading font-bold mt-1 text-sm break-all group-hover:text-rose-700 dark:group-hover:text-sky-300">
                  {PROFILE.email}
                </p>
              </a>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800">
                <MapPin className="w-5 h-5 text-rose-700 dark:text-sky-400 mb-3" />
                <p className="text-xs text-[#5b3e4e] dark:text-slate-400">Domisili</p>
                <p className="font-heading font-bold mt-1">{PROFILE.location}</p>
              </div>

              <a
                href={PROFILE.lynkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 hover:border-rose-400 dark:hover:border-sky-400/60 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-rose-700 dark:text-sky-400 mb-3" />
                <p className="text-xs text-[#5b3e4e] dark:text-slate-400">Tautan Personal</p>
                <p className="font-heading font-bold mt-1 group-hover:text-rose-700 dark:group-hover:text-sky-300">
                  {PROFILE.lynkLabel}
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-[#ffedf2]/70 dark:bg-[#030610] border-t border-rose-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5b3e4e] dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-700 dark:text-sky-400" />
            <span>
              &copy; {new Date().getFullYear()} {PROFILE.name} — {PROFILE.role} {PROFILE.school}.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#portofolio" className="hover:text-rose-800 dark:hover:text-white transition-colors">
              Portofolio
            </a>
            <a href="#analitik" className="hover:text-rose-800 dark:hover:text-white transition-colors">
              Analitik
            </a>
            <a href="#kontak" className="hover:text-rose-800 dark:hover:text-white transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button (Bottom-Right) */}
      <button
        type="button"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        aria-label="Naik ke atas halaman"
        title="Naik ke Atas"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-rose-700 hover:bg-rose-800 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 shadow-lg border border-rose-800/20 dark:border-sky-300/30 transition-transform hover:-translate-y-0.5 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        viewCount={activeProject ? analytics.projectViews[activeProject.id] || 0 : 0}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
