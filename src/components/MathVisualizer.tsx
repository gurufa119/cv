import {useMemo, useState} from 'react';

type MathMode = 'sine' | 'parabola' | 'polyhedron';

export function MathVisualizer({compact = false}: {compact?: boolean}) {
  const [mode, setMode] = useState<MathMode>('sine');
  const [param, setParam] = useState<number>(1.2);

  const sinePath = useMemo(() => {
    const width = 320;
    const height = 140;
    const midY = height / 2;
    const amp = 22 * param;
    const points: string[] = [];
    for (let x = 0; x <= width; x += 4) {
      const t = (x / width) * Math.PI * 4;
      const y = midY - Math.sin(t) * amp;
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(2)}`);
    }
    return points.join(' ');
  }, [param]);

  const parabolaPath = useMemo(() => {
    const width = 320;
    const height = 140;
    const midX = width / 2;
    const baseY = height - 20;
    const points: string[] = [];
    for (let x = 20; x <= width - 20; x += 4) {
      const normX = (x - midX) / 100;
      const y = baseY - Math.min(105, Math.pow(normX, 2) * 48 * param);
      points.push(`${x === 20 ? 'M' : 'L'} ${x} ${y.toFixed(2)}`);
    }
    return points.join(' ');
  }, [param]);

  const cubeGeometry = useMemo(() => {
    const angle = (param - 0.5) * 0.85;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const size = 34;

    const vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ].map(([vx, vy, vz]) => {
      const rx = vx * cos - vz * sin;
      const rz = vx * sin + vz * cos;
      const ry = vy * 0.92 - rz * 0.25;
      return {
        x: 160 + rx * size,
        y: 72 + ry * size,
      };
    });

    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    return {vertices, edges};
  }, [param]);

  const formulaLabel =
    mode === 'sine'
      ? `f(x) = ${param.toFixed(1)} · sin(x)`
      : mode === 'parabola'
        ? `f(x) = ${param.toFixed(1)}x²`
        : `θ = ${Math.round((param - 0.5) * 48)}° · Dimensi 3D`;

  return (
    <div className="rounded-xl border border-rose-200/80 dark:border-sky-500/20 bg-rose-50/60 dark:bg-[#070f23] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs font-medium text-rose-800 dark:text-sky-300 tabular-nums">
          {formulaLabel}
        </span>

        <div className="flex items-center gap-1 rounded-lg bg-white/90 dark:bg-[#0d1833] p-1 border border-rose-200/70 dark:border-slate-700/70">
          <button
            type="button"
            onClick={() => setMode('sine')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'sine'
                ? 'bg-rose-700 text-white dark:bg-sky-500 dark:text-slate-950'
                : 'text-rose-900/70 dark:text-slate-300 hover:text-rose-950 dark:hover:text-white'
            }`}
          >
            Sinus
          </button>
          <button
            type="button"
            onClick={() => setMode('parabola')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'parabola'
                ? 'bg-rose-700 text-white dark:bg-sky-500 dark:text-slate-950'
                : 'text-rose-900/70 dark:text-slate-300 hover:text-rose-950 dark:hover:text-white'
            }`}
          >
            Kuadrat
          </button>
          <button
            type="button"
            onClick={() => setMode('polyhedron')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'polyhedron'
                ? 'bg-rose-700 text-white dark:bg-sky-500 dark:text-slate-950'
                : 'text-rose-900/70 dark:text-slate-300 hover:text-rose-950 dark:hover:text-white'
            }`}
          >
            Ruang 3D
          </button>
        </div>
      </div>

      <div className={`w-full overflow-hidden rounded-lg bg-white/90 dark:bg-[#040917] border border-rose-100 dark:border-slate-800/80 ${compact ? 'h-32' : 'h-36'}`}>
        <svg viewBox="0 0 320 140" className="w-full h-full" role="img" aria-label="Visualisasi interaktif matematika">
          {/* Coordinate Axes */}
          <line x1="12" y1="70" x2="308" y2="70" className="stroke-rose-200 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="10" x2="160" y2="130" className="stroke-rose-200 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 3" />

          {mode === 'sine' && (
            <path
              d={sinePath}
              fill="none"
              className="stroke-rose-600 dark:stroke-sky-400 transition-all duration-150"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {mode === 'parabola' && (
            <path
              d={parabolaPath}
              fill="none"
              className="stroke-rose-600 dark:stroke-sky-400 transition-all duration-150"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {mode === 'polyhedron' && (
            <g>
              {cubeGeometry.edges.map(([a, b], idx) => (
                <line
                  key={idx}
                  x1={cubeGeometry.vertices[a].x}
                  y1={cubeGeometry.vertices[a].y}
                  x2={cubeGeometry.vertices[b].x}
                  y2={cubeGeometry.vertices[b].y}
                  className={idx >= 8 ? 'stroke-rose-400 dark:stroke-cyan-300' : 'stroke-rose-700 dark:stroke-sky-400'}
                  strokeWidth="2"
                />
              ))}
              {cubeGeometry.vertices.map((v, idx) => (
                <circle
                  key={idx}
                  cx={v.x}
                  cy={v.y}
                  r="3"
                  className="fill-rose-700 dark:fill-sky-300"
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="math-param-slider" className="text-xs font-medium text-rose-900/75 dark:text-slate-300 whitespace-nowrap shrink-0">
          {mode === 'polyhedron' ? 'Sudut Rotasi' : 'Parameter a'}
        </label>
        <input
          id="math-param-slider"
          type="range"
          min="0.5"
          max="2.2"
          step="0.1"
          value={param}
          onChange={(e) => setParam( parseFloat(e.target.value) )}
          className="w-full accent-rose-700 dark:accent-sky-400 cursor-pointer"
        />
        <span className="font-mono text-xs text-rose-800 dark:text-sky-300 tabular-nums w-8 text-right">
          {param.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
