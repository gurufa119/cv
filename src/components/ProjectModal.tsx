import {useEffect} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {CheckCircle2, ExternalLink, Eye, X} from 'lucide-react';
import type {PortfolioProject} from '../data/cvData';
import {ProjectCardVisual} from './ProjectCardVisual';
import {MathVisualizer} from './MathVisualizer';

interface ProjectModalProps {
  project: PortfolioProject | null;
  viewCount: number;
  onClose: () => void;
}

export function ProjectModal({project, viewCount, onClose}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  const showInteractiveMath =
    project?.visualType === 'ar-geometry' || project?.visualType === 'function-plotter';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.18}}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0b132b] text-[#1e1018] dark:text-slate-100 border border-rose-200 dark:border-sky-500/25 shadow-2xl p-6 sm:p-8"
            initial={{opacity: 0, scale: 0.96, y: 12}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.97, y: 8}}
            transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-rose-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-rose-700 dark:text-sky-300">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.institution}</span>
                </div>
                <h3 id="project-modal-title" className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-[#5b3e4e] dark:text-slate-400">
                  Peran: {project.role}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail proyek"
                className="p-2.5 rounded-xl bg-rose-50 dark:bg-slate-800/80 text-rose-900 dark:text-slate-200 hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Preview / Interactive Demo */}
            <div className="mt-6">
              {showInteractiveMath ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#5b3e4e] dark:text-slate-400">
                    Simulasi Interaktif Konsep Matematika
                  </p>
                  <MathVisualizer compact />
                </div>
              ) : (
                <ProjectCardVisual type={project.visualType} />
              )}
            </div>

            {/* Description */}
            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-heading text-sm font-bold text-[#1e1018] dark:text-white mb-2">
                  Deskripsi & Konteks Implementasi
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#422a38] dark:text-slate-300">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-[#070f23] border border-rose-200/70 dark:border-slate-800">
                  <p className="text-xs font-semibold text-rose-800 dark:text-sky-300 mb-1.5">
                    Fokus Konsep Matematika
                  </p>
                  <p className="text-sm font-medium text-[#1e1018] dark:text-slate-200">
                    {project.mathFocus}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-[#070f23] border border-rose-200/70 dark:border-slate-800">
                  <p className="text-xs font-semibold text-rose-800 dark:text-sky-300 mb-1.5">
                    Perangkat & Teknologi Digital
                  </p>
                  <p className="text-sm font-medium text-[#1e1018] dark:text-slate-200">
                    {project.digitalTools.join(' · ')}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-heading text-sm font-bold text-[#1e1018] dark:text-white mb-2.5">
                  Dampak & Capaian Pembelajaran
                </h4>
                <ul className="space-y-2">
                  {project.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#422a38] dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-rose-700 dark:text-sky-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-8 pt-5 border-t border-rose-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#5b3e4e] dark:text-slate-400">
                <Eye className="w-4 h-4 text-rose-700 dark:text-sky-400" />
                <span>Dilihat pada sesi/perangkat ini: {viewCount} kali</span>
              </div>

              <div className="flex items-center gap-3">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-rose-700 hover:bg-rose-800 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Kunjungi Tautan Materi</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-rose-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
