/**
 * Code-drawn decorative thumbnails for artifact cards.
 * kind="timeline": mini era chart (bars + rising compute curve)
 * kind="chatbot": chat bubbles with a sparkle
 * kind="report": ML table vs DL network split panel
 */
export default function ArtifactThumb({
  kind,
}: {
  kind: "timeline" | "chatbot" | "report";
}) {
  if (kind === "timeline") {
    return (
      <svg aria-hidden viewBox="0 0 200 110" className="h-full w-full">
        <defs>
          <linearGradient id="tl-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--teal)" />
            <stop offset="100%" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        {/* era bars: booms tall, winters short */}
        {[
          [14, 38],
          [38, 56],
          [62, 20],
          [86, 16],
          [110, 44],
          [134, 66],
          [158, 84],
        ].map(([x, h], i) => (
          <rect
            key={i}
            x={x}
            y={96 - h}
            width="14"
            height={h}
            rx="3"
            fill={h < 26 ? "var(--line)" : "url(#tl-grad)"}
            opacity={h < 26 ? 0.9 : 0.75}
          />
        ))}
        {/* compute curve */}
        <path
          d="M12 88 C 55 86, 90 84, 118 68 S 175 22, 192 12"
          fill="none"
          stroke="url(#tl-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="192" cy="12" r="3.6" fill="var(--violet)" />
        <line x1="10" y1="96" x2="190" y2="96" stroke="var(--line)" strokeWidth="1.4" />
      </svg>
    );
  }

  if (kind === "report") {
    return (
      <svg aria-hidden viewBox="0 0 200 110" className="h-full w-full">
        <defs>
          <linearGradient id="rp-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" />
            <stop offset="100%" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        {/* left: classical ML — tidy feature table */}
        {[22, 40, 58, 76].map((y, i) => (
          <g key={y}>
            <rect x="16" y={y} width="30" height="9" rx="2.5" fill="var(--teal)" opacity={0.75 - i * 0.12} />
            <rect x="52" y={y} width="34" height="9" rx="2.5" fill="var(--raised)" stroke="var(--line)" />
          </g>
        ))}
        {/* divider */}
        <line x1="100" y1="14" x2="100" y2="96" stroke="url(#rp-grad)" strokeWidth="1.6" opacity="0.7" />
        <text x="100" y="106" textAnchor="middle" fontSize="8" fill="var(--muted)" fontFamily="monospace">
          vs
        </text>
        {/* right: deep learning — layered network */}
        {[
          [122, 28], [122, 55], [122, 82],
          [152, 41], [152, 69],
          [180, 55],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.5" fill={i > 2 ? "var(--violet)" : "var(--teal)"} opacity="0.85" />
        ))}
        {[
          [122, 28, 152, 41], [122, 55, 152, 41], [122, 55, 152, 69],
          [122, 82, 152, 69], [152, 41, 180, 55], [152, 69, 180, 55],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line)" strokeWidth="1.4" />
        ))}
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 200 110" className="h-full w-full">
      <defs>
        <linearGradient id="cb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      {/* incoming bubble */}
      <rect x="18" y="18" width="92" height="30" rx="12" fill="var(--raised)" stroke="var(--line)" />
      <circle cx="36" cy="33" r="3" fill="var(--muted)" />
      <circle cx="50" cy="33" r="3" fill="var(--muted)" />
      <circle cx="64" cy="33" r="3" fill="var(--muted)" />
      {/* reply bubble */}
      <rect x="72" y="58" width="110" height="32" rx="12" fill="url(#cb-grad)" opacity="0.85" />
      <line x1="86" y1="70" x2="168" y2="70" stroke="var(--background)" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="86" y1="79" x2="146" y2="79" stroke="var(--background)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      {/* sparkle */}
      <path
        d="M164 22 l3.4 9 9 3.4 -9 3.4 -3.4 9 -3.4 -9 -9 -3.4 9 -3.4 Z"
        fill="var(--teal)"
        opacity="0.9"
      />
    </svg>
  );
}
