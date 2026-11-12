/**
 * Code-drawn hero scene for /lectures: "the lamp turns on over an open book".
 *
 * Plays once on load (no infinite loops). Animates only opacity, transform and
 * stroke-dashoffset. The base markup IS the final, fully visible state; the
 * keyframes only describe where each piece comes FROM, so with
 * prefers-reduced-motion (animation: none) everything is simply there.
 * Decorative: aria-hidden, the meaning lives in the hero copy.
 */
export function HeroScene({ className }: { className?: string }) {
  // Text lines on each page, drawn right-to-left (Hebrew reading direction).
  const rightLines = [0, 1, 2, 3, 4, 5, 6];
  const leftLines = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg
      viewBox="90 30 450 330"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <radialGradient id="ls-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="var(--cta)" stopOpacity="0.28" />
          <stop offset="60%" stopColor="var(--cta)" stopOpacity="0.07" />
          <stop offset="100%" stopColor="var(--cta)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* lamp light pool */}
      <ellipse className="ls-glow" cx="315" cy="200" rx="225" ry="165" fill="url(#ls-glow)" />

      {/* lamp: stem + shade, drawn as strokes */}
      <g className="ls-lamp" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path className="ls-draw" pathLength={1} d="M520 350 L520 120 Q520 70 470 62" />
        <path className="ls-draw" pathLength={1} d="M430 70 L510 54 L498 92 Q470 104 440 100 Z" />
      </g>
      <circle className="ls-bulb" cx="466" cy="104" r="6" fill="var(--cta)" />

      {/* open book */}
      <g className="ls-book" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
        <path className="ls-draw" pathLength={1} d="M300 150 Q230 128 110 140 L110 330 Q230 318 300 340" />
        <path className="ls-draw" pathLength={1} d="M300 150 Q370 128 490 140 L490 330 Q370 318 300 340" />
        <path className="ls-draw" pathLength={1} d="M300 150 L300 340" />
      </g>

      {/* text lines: right page then left page, each line grows from the right edge */}
      <g className="ls-lines" fill="currentColor">
        {rightLines.map((i) => (
          <rect
            key={`r${i}`}
            className="ls-line"
            style={{ animationDelay: `${900 + i * 70}ms` }}
            x={322}
            y={170 + i * 21}
            width={i === 3 ? 120 : 150 - (i % 3) * 14}
            height={5}
            rx={2.5}
            opacity={0.38}
          />
        ))}
        {leftLines.map((i) => (
          <rect
            key={`l${i}`}
            className="ls-line"
            style={{ animationDelay: `${1400 + i * 70}ms` }}
            x={128 + (i % 3) * 14}
            y={170 + i * 21}
            width={150 - (i % 3) * 14}
            height={5}
            rx={2.5}
            opacity={0.38}
          />
        ))}
      </g>

      {/* the line the tool "found": amber highlight on the right page */}
      <rect className="ls-mark" x={322} y={231} width={120} height={9} rx={4.5} fill="var(--cta)" />

      {/* thread from the highlighted line to its source, and a check: you verify */}
      <path
        className="ls-thread ls-draw"
        pathLength={1}
        d="M322 236 C 270 236, 250 300, 196 300"
        fill="none"
        stroke="var(--cta)"
        strokeWidth="2"
        strokeDasharray="1 0"
        strokeLinecap="round"
      />
      <circle className="ls-source" cx="188" cy="300" r="13" fill="none" stroke="var(--cta)" strokeWidth="2" />
      <path
        className="ls-check ls-draw"
        pathLength={1}
        d="M182 300 L187 305 L195 295"
        fill="none"
        stroke="var(--cta)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
