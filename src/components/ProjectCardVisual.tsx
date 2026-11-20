import type {ProjectVisualType} from '../data/cvData';

export function ProjectCardVisual({type}: {type: ProjectVisualType}) {
  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-rose-200/70 dark:border-slate-700/70 bg-rose-50/70 dark:bg-[#070f23] flex items-center justify-center">
      {type === 'ar-geometry' && (
        <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
          <defs>
            <pattern id="grid-ar" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-rose-200/60 dark:stroke-sky-500/15" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="320" height="160" fill="url(#grid-ar)" />
          {/* 3D Isometric Cube & Diagonal Plane */}
          <polygon points="160,28 218,58 160,88 102,58" className="fill-rose-500/10 dark:fill-sky-400/15 stroke-rose-700 dark:stroke-sky-400" strokeWidth="1.75" />
          <polygon points="102,58 160,88 160,136 102,106" className="fill-rose-600/15 dark:fill-sky-500/20 stroke-rose-700 dark:stroke-sky-400" strokeWidth="1.75" />
          <polygon points="218,58 160,88 160,136 218,106" className="fill-rose-400/10 dark:fill-cyan-400/10 stroke-rose-700 dark:stroke-sky-400" strokeWidth="1.75" />
          {/* Diagonal triangle */}
          <line x1="102" y1="106" x2="218" y2="58" className="stroke-rose-600 dark:stroke-amber-400" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="160" y1="28" x2="160" y2="136" className="stroke-rose-500/70 dark:stroke-cyan-300/70" strokeWidth="1.25" strokeDasharray="3 3" />
          <circle cx="160" cy="88" r="4" className="fill-rose-700 dark:fill-amber-400" />
          <text x="236" y="42" className="fill-rose-800 dark:fill-sky-300 font-mono text-[10px]">AR 3D · (x,y,z)</text>
        </svg>
      )}

      {type === 'akm-numeracy' && (
        <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
          <line x1="40" y1="130" x2="285" y2="130" className="stroke-rose-300 dark:stroke-slate-600" strokeWidth="1.5" />
          <line x1="40" y1="25" x2="40" y2="130" className="stroke-rose-300 dark:stroke-slate-600" strokeWidth="1.5" />
          <rect x="64" y="84" width="28" height="46" rx="4" className="fill-rose-300 dark:fill-sky-800" />
          <rect x="108" y="60" width="28" height="70" rx="4" className="fill-rose-500 dark:fill-sky-600" />
          <rect x="152" y="42" width="28" height="88" rx="4" className="fill-rose-700 dark:fill-sky-400" />
          <rect x="196" y="70" width="28" height="60" rx="4" className="fill-rose-400 dark:fill-cyan-500" />
          <rect x="240" y="50" width="28" height="80" rx="4" className="fill-rose-600 dark:fill-sky-500" />
          <path d="M 78 80 L 122 56 L 166 36 L 210 66 L 254 44" fill="none" className="stroke-rose-900 dark:stroke-amber-300" strokeWidth="2" />
          <circle cx="166" cy="36" r="4" className="fill-rose-900 dark:fill-amber-300" />
          <text x="200" y="28" className="fill-rose-800 dark:fill-sky-300 font-mono text-[10px]">∑ f(x) · AKM</text>
        </svg>
      )}

      {type === 'gwe-ecosystem' && (
        <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
          <line x1="160" y1="80" x2="80" y2="44" className="stroke-rose-300 dark:stroke-sky-500/40" strokeWidth="1.75" />
          <line x1="160" y1="80" x2="240" y2="44" className="stroke-rose-300 dark:stroke-sky-500/40" strokeWidth="1.75" />
          <line x1="160" y1="80" x2="80" y2="118" className="stroke-rose-300 dark:stroke-sky-500/40" strokeWidth="1.75" />
          <line x1="160" y1="80" x2="240" y2="118" className="stroke-rose-300 dark:stroke-sky-500/40" strokeWidth="1.75" />
          <circle cx="160" cy="80" r="24" className="fill-rose-700 dark:fill-sky-500" />
          <text x="160" y="84" textAnchor="middle" className="fill-white dark:fill-slate-950 font-mono text-[10px] font-bold">belajar.id</text>
          {[
            {x: 80, y: 44, label: 'Classroom'},
            {x: 240, y: 44, label: 'Drive'},
            {x: 80, y: 118, label: 'Forms'},
            {x: 240, y: 118, label: 'Sites'},
          ].map((node) => (
            <g key={node.label}>
              <rect x={node.x - 32} y={node.y - 13} width="64" height="26" rx="6" className="fill-white dark:fill-[#0d1936] stroke-rose-300 dark:stroke-sky-400/50" strokeWidth="1.25" />
              <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-rose-900 dark:fill-slate-200 font-mono text-[9px] font-medium">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      )}

      {type === 'video-calculus' && (
        <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
          <rect x="38" y="22" width="244" height="94" rx="10" className="fill-white dark:fill-[#0d1936] stroke-rose-200 dark:stroke-slate-700" strokeWidth="1.5" />
          <path d="M 60 95 Q 140 85 190 45 T 260 36" fill="none" className="stroke-rose-600 dark:stroke-sky-400" strokeWidth="2.2" />
          <line x1="125" y1="88" x2="235" y2="34" className="stroke-rose-400 dark:stroke-amber-400" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="180" cy="61" r="14" className="fill-rose-700/90 dark:fill-sky-500/90" />
          <polygon points="176,55 176,67 187,61" className="fill-white dark:fill-slate-950" />
          {/* Timeline bar */}
          <rect x="38" y="128" width="244" height="6" rx="3" className="fill-rose-200 dark:fill-slate-800" />
          <rect x="38" y="128" width="145" height="6" rx="3" className="fill-rose-600 dark:fill-sky-400" />
          <circle cx="110" cy="131" r="5" className="fill-rose-800 dark:fill-amber-300" />
          <circle cx="183" cy="131" r="5" className="fill-rose-800 dark:fill-amber-300" />
          <text x="64" y="42" className="fill-rose-800 dark:fill-sky-300 font-mono text-[10px]">dy/dx · Checkpoint</text>
        </svg>
      )}

      {type === 'pmm-curriculum' && (
        <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
          <rect x="32" y="24" width="116" height="50" rx="8" className="fill-white dark:fill-[#0d1936] stroke-rose-300 dark:stroke-sky-400/50" strokeWidth="1.5" />
          <rect x="172" y="24" width="116" height="50" rx="8" className="fill-white dark:fill-[#0d1936] stroke-rose-300 dark:stroke-sky-400/50" strokeWidth="1.5" />
          <rect x="32" y="88" width="116" height="50" rx="8" className="fill-white dark:fill-[#0d1936] stroke-rose-300 dark:stroke-sky-400/50" strokeWidth="1.5" />
          <rect x="172" y="88" width="116" height="50" rx="8" className="fill-rose-700 dark:fill-sky-500" />
          <text x="46" y="47" className="fill-rose-900 dark:fill-slate-100 font-mono text-[10px] font-bold">01 · CP & ATP</text>
          <text x="46" y="62" className="fill-rose-700/75 dark:fill-slate-400 text-[9px]">Pemetaan Fase E/F</text>
          <text x="186" y="47" className="fill-rose-900 dark:fill-slate-100 font-mono text-[10px] font-bold">02 · Modul Ajar</text>
          <text x="186" y="62" className="fill-rose-700/75 dark:fill-slate-400 text-[9px]">Diferensiasi</text>
          <text x="46" y="111" className="fill-rose-900 dark:fill-slate-100 font-mono text-[10px] font-bold">03 · Projek P5</text>
          <text x="46" y="126" className="fill-rose-700/75 dark:fill-slate-400 text-[9px]">Kolaborasi Lintas</text>
          <text x="186" y="111" className="fill-white dark:fill-slate-950 font-mono text-[10px] font-bold">04 · Aksi Nyata</text>
          <text x="186" y="126" className="fill-rose-100 dark:fill-slate-900 text-[9px]">Validasi PMM</text>
        </svg>
      )}

      {type === 'function-plotter' && (
        <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
          <line x1="20" y1="80" x2="300" y2="80" className="stroke-rose-300 dark:stroke-slate-700" strokeWidth="1.25" />
          <line x1="160" y1="15" x2="160" y2="145" className="stroke-rose-300 dark:stroke-slate-700" strokeWidth="1.25" />
          <path
            d="M 30 80 Q 95 16 160 80 T 290 80"
            fill="none"
            className="stroke-rose-700 dark:stroke-sky-400"
            strokeWidth="2.5"
          />
          <path
            d="M 30 105 Q 160 15 290 105"
            fill="none"
            className="stroke-rose-400 dark:stroke-cyan-300"
            strokeWidth="1.75"
            strokeDasharray="5 4"
          />
          <circle cx="95" cy="48" r="4" className="fill-rose-700 dark:fill-amber-300" />
          <circle cx="225" cy="112" r="4" className="fill-rose-700 dark:fill-amber-300" />
          <text x="26" y="28" className="fill-rose-800 dark:fill-sky-300 font-mono text-[10px]">y = a·sin(bx) &amp; ax²</text>
        </svg>
      )}
    </div>
  );
}
