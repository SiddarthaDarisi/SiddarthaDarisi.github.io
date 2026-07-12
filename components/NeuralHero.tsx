/**
 * Code-drawn hero visual: a slowly pulsing neural mesh.
 * Pure SVG + CSS animation (mesh-node / mesh-edge classes in globals.css).
 * Decorative only — hidden from assistive tech.
 */

const nodes: Array<[number, number, number]> = [
  // [x, y, r] on a 600x520 canvas — three loose "layers"
  [80, 90, 7],
  [60, 240, 5],
  [95, 390, 7],
  [70, 480, 4],
  [280, 60, 5],
  [300, 190, 9],
  [270, 330, 6],
  [295, 460, 5],
  [500, 120, 6],
  [530, 270, 8],
  [495, 420, 6],
];

const edges: Array<[number, number]> = [
  [0, 5],
  [1, 5],
  [1, 6],
  [2, 6],
  [2, 7],
  [3, 7],
  [0, 4],
  [4, 5],
  [5, 8],
  [5, 9],
  [6, 9],
  [6, 10],
  [7, 10],
  [8, 9],
  [9, 10],
];

export default function NeuralHero() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 520"
      className="h-full w-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="mesh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
        <radialGradient id="node-halo">
          <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          className="mesh-edge"
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="url(#mesh-grad)"
          strokeWidth="1.1"
          opacity="0.5"
          style={{ animationDelay: `${(i % 5) * -1.8}s` }}
        />
      ))}

      {nodes.map(([x, y, r], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r={r * 3.2} fill="url(#node-halo)" opacity="0.5" />
          <circle
            className="mesh-node"
            cx={x}
            cy={y}
            r={r}
            fill={i % 3 === 2 ? "var(--violet)" : "var(--teal)"}
            style={{ animationDelay: `${(i % 6) * -0.75}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
