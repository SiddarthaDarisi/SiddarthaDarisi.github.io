/**
 * Code-drawn decorative thumbnails for artifact cards.
 * kind="timeline": mini era chart (bars + rising compute curve)
 * kind="chatbot": chat bubbles with a sparkle
 */
export default function ArtifactThumb({
  kind,
}: {
  kind: "timeline" | "chatbot";
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
