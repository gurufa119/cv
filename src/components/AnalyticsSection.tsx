import {Activity, Clock, Eye, MousePointerClick, RotateCcw, Users} from 'lucide-react';
import {PORTFOLIO_PROJECTS} from '../data/cvData';
import type {AnalyticsState} from '../hooks/useAnalytics';

interface AnalyticsSectionProps {
  analytics: AnalyticsState;
  onReset: () => void;
  onSelectProject: (projectId: string) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function AnalyticsSection({analytics, onReset, onSelectProject}: AnalyticsSectionProps) {
  const totalProjectClicks = Object.values(analytics.projectViews).reduce((sum, val) => sum + val, 0);
  const maxViews = Math.max(1, ...PORTFOLIO_PROJECTS.map((p) => analytics.projectViews[p.id] || 0));

  return (
    <section id="analitik" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-rose-200/70 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-rose-700 dark:text-sky-400">
              Pemantauan Kunjungan Langsung
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Analitik Pengunjung Real-Time
            </h2>
            <p className="text-sm text-[#5b3e4e] dark:text-slate-400 mt-1.5 max-w-2xl">
              Merekam interaksi pengunjung terhadap proyek portofolio, tab aktif lintas jendela, dan durasi kunjungan secara langsung.
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-rose-200 dark:border-slate-700 bg-white dark:bg-[#0b132b] hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Statistik Lokal</span>
          </button>
        </div>

        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-[#5b3e4e] dark:text-slate-400">
              <span>Pengunjung Aktif</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                Live
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <Users className="w-4 h-4 text-rose-700 dark:text-sky-400 shrink-0" />
              <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums">
                {analytics.activeTabs}
              </span>
              <span className="text-xs text-[#5b3e4e] dark:text-slate-400">sesi tab</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-[#5b3e4e] dark:text-slate-400">
              <span>Total Kunjungan</span>
              <Eye className="w-4 h-4 text-rose-700 dark:text-sky-400" />
            </div>
            <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold tabular-nums">
              {analytics.totalVisits}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-[#5b3e4e] dark:text-slate-400">
              <span>Klik Detail Proyek</span>
              <MousePointerClick className="w-4 h-4 text-rose-700 dark:text-sky-400" />
            </div>
            <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold tabular-nums">
              {totalProjectClicks}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-[#5b3e4e] dark:text-slate-400">
              <span>Durasi Sesi Aktif</span>
              <Clock className="w-4 h-4 text-rose-700 dark:text-sky-400" />
            </div>
            <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold tabular-nums">
              {formatDuration(analytics.sessionSeconds)}
            </div>
          </div>
        </div>

        {/* Project Popularity Chart + Live Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-5">
              <h3 className="font-heading text-base font-bold">
                Minat Pengunjung per Proyek Portofolio
              </h3>
              <span className="font-mono text-xs text-[#5b3e4e] dark:text-slate-400 tabular-nums">
                Bagian Aktif: #{analytics.activeSection}
              </span>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_PROJECTS.map((proj) => {
                const count = analytics.projectViews[proj.id] || 0;
                const widthPercent = count === 0 ? 4 : Math.max(8, Math.round((count / maxViews) * 100));
                return (
                  <div key={proj.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <button
                        type="button"
                        onClick={() => onSelectProject(proj.id)}
                        className="text-left font-medium hover:text-rose-700 dark:hover:text-sky-400 transition-colors truncate cursor-pointer"
                      >
                        {proj.title}
                      </button>
                      <span className="font-mono text-xs font-semibold tabular-nums shrink-0 text-rose-800 dark:text-sky-300">
                        {count} klik
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-rose-100 dark:bg-slate-800/90 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-rose-600 dark:bg-sky-400 transition-all duration-300"
                        style={{width: `${widthPercent}%`}}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#0b132b] border border-rose-200/80 dark:border-slate-800 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-rose-700 dark:text-sky-400" />
              <h3 className="font-heading text-base font-bold">Log Interaksi Terbaru</h3>
            </div>

            {analytics.recentEvents.length === 0 ? (
              <p className="text-sm text-[#5b3e4e] dark:text-slate-400 py-8 text-center">
                Belum ada interaksi tercatat pada sesi ini.
              </p>
            ) : (
              <ul className="divide-y divide-rose-100 dark:divide-slate-800/80 text-sm">
                {analytics.recentEvents.map((evt) => (
                  <li key={evt.id} className="py-2.5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-[#1e1018] dark:text-slate-200 truncate">
                        {evt.target}
                      </p>
                      <p className="text-xs text-[#5b3e4e] dark:text-slate-400">
                        {evt.action}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#5b3e4e] dark:text-slate-400 tabular-nums shrink-0">
                      {evt.timestamp}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
