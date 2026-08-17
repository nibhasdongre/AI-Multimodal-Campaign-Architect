type NodeDef = {
  id: string;
  x: number;
  y: number;
  w: number;
  label: string;
  icon: keyof typeof ICONS;
  signal?: boolean;
};

type EdgeDef = { from: [number, number]; to: [number, number]; delay: number };

const H = 44; // badge height, shared by every node

// Monoline 20x20 icon paths — kept simple/geometric to match the blueprint aesthetic.
const ICONS = {
  brand: (
    <path d="M4 3h9l7 7-9 9-7-7V3z M8 8h.01" strokeLinecap="round" strokeLinejoin="round" />
  ),
  pencil: (
    <path
      d="M14.5 3.5l2 2L6 16l-3 1 1-3L14.5 3.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  image: (
    <>
      <rect x="3" y="4" width="14" height="12" rx="1.5" />
      <circle cx="7.5" cy="8.5" r="1.5" />
      <path d="M3 14l4.5-4.5L11 13l2.5-2.5L17 14" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  wave: (
    <path
      d="M2 10h2l1.5-5 2 10 2-13 2 13 1.5-5H16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  doc: (
    <>
      <path d="M6 2h6l3 3v13H6V2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 9h5M8.5 12h5M8.5 15h3" strokeLinecap="round" />
    </>
  ),
  shield: (
    <path
      d="M10 2l7 3v5c0 5-3.5 7.5-7 8-3.5-.5-7-3-7-8V5l7-3z M7 10l2 2 4-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  human: (
    <>
      <circle cx="10" cy="6" r="3" />
      <path d="M3 17c1-4 4-6 7-6s6 2 7 6" strokeLinecap="round" />
    </>
  ),
  sparkle: (
    <path
      d="M10 2l1.4 4.6L16 8l-4.6 1.4L10 14l-1.4-4.6L4 8l4.6-1.4L10 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const nodes: NodeDef[] = [
  { id: "n1", x: 16, y: 108, w: 220, label: "Obtain brand requirements", icon: "brand" },
  { id: "n2", x: 266, y: 108, w: 168, label: "Generate copy", icon: "pencil" },
  { id: "n3a", x: 540, y: 12, w: 220, label: "Build a moodboard", icon: "image" },
  { id: "n3b", x: 540, y: 70, w: 230, label: "Generate audio of script", icon: "wave" },
  { id: "n3c", x: 540, y: 128, w: 220, label: "Build the pitch", icon: "doc" },
  { id: "n3d", x: 540, y: 186, w: 220, label: "Run guardrail check", icon: "shield" },
  { id: "n4", x: 830, y: 108, w: 170, label: "Human in the loop", icon: "human", signal: true },
  { id: "n5", x: 1108, y: 108, w: 176, label: "Generate image", icon: "sparkle" },
];

const edges: EdgeDef[] = [
  { from: [216, 130], to: [266, 130], delay: 0 },
  { from: [434, 130], to: [540, 34], delay: 0.15 },
  { from: [434, 130], to: [540, 92], delay: 0.2 },
  { from: [434, 130], to: [540, 150], delay: 0.25 },
  { from: [434, 130], to: [540, 208], delay: 0.3 },
  { from: [760, 34], to: [830, 118], delay: 0.5 },
  { from: [760, 92], to: [830, 124], delay: 0.52 },
  { from: [760, 150], to: [830, 136], delay: 0.54 },
  { from: [760, 208], to: [830, 142], delay: 0.56 },
  { from: [1000, 130], to: [1108, 130], delay: 0.75 },
];

export function PipelineDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 1320 260"
        className="min-w-[900px] w-full"
        aria-label="The system's actual tool pipeline: brand context retrieval, copy generation, four parallel tools (moodboard search, audio generation, pitch synthesis, guardrail check), a human confirmation checkpoint, then final image generation."
      >
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" fill="#5EC8D8" fillOpacity={0.7} />
          </marker>
          <filter id="signalGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bracket grouping the 4 concurrent tools */}
        <g className="animate-fade-up" style={{ animationDelay: "0.05s", opacity: 0 }}>
          <rect
            x={524}
            y={0}
            width={252}
            height={234}
            rx={10}
            fill="none"
            stroke="#3A4B5C"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={650}
            y={-8}
            textAnchor="middle"
            className="font-mono uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.15em", fill: "#5EC8D8" }}
          >
            runs concurrently
          </text>
        </g>

        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.from[0]}
            y1={e.from[1]}
            x2={e.to[0]}
            y2={e.to[1]}
            stroke="#5EC8D8"
            strokeWidth={1.5}
            strokeOpacity={0.6}
            markerEnd="url(#arrowhead)"
            pathLength={1}
            strokeDasharray={1}
            className="animate-[draw-line_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${e.delay}s` }}
          />
        ))}

        {nodes.map((n, i) => (
          <g
            key={n.id}
            className="animate-fade-up"
            style={{ animationDelay: `${0.06 * i + 0.15}s`, opacity: 0 }}
            filter={n.signal ? "url(#signalGlow)" : undefined}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={H}
              rx={22}
              fill={n.signal ? "#1A1310" : "#161D26"}
              stroke={n.signal ? "#FF5A36" : "#3A4B5C"}
              strokeWidth={n.signal ? 1.75 : 1.25}
            />
            <g
              transform={`translate(${n.x + 14}, ${n.y + H / 2 - 10})`}
              stroke={n.signal ? "#FF5A36" : "#5EC8D8"}
              strokeWidth={1.4}
              fill="none"
            >
              {ICONS[n.icon]}
            </g>
            <text
              x={n.x + 42}
              y={n.y + H / 2 + 4}
              className="font-mono"
              style={{
                fontSize: "11.5px",
                letterSpacing: "0.01em",
                fill: n.signal ? "#FF5A36" : "#EDEEE9",
              }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}