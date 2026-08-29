import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const nodes = [
  { id: "lead", label: "New Lead", x: 40, y: 40 },
  { id: "enrich", label: "Enrich", x: 200, y: 40 },
  { id: "crm", label: "CRM", x: 360, y: 40 },
  { id: "wa", label: "WhatsApp Reply", x: 360, y: 140 },
  { id: "alert", label: "Team Alert", x: 200, y: 140 },
  { id: "report", label: "Weekly Report", x: 40, y: 140 },
];

const paths = [
  "M88 52 H168",
  "M248 52 H328",
  "M392 72 V116",
  "M328 152 H248",
  "M168 152 H88",
];

export function WorkflowDiagram() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="overflow-x-auto rounded-3xl border border-navy-700 bg-navy-800 p-4 sm:p-8">
      <svg
        viewBox="0 0 440 196"
        className="h-auto w-full min-w-[320px]"
        role="img"
        aria-label="Workflow: New Lead to Enrich to CRM to WhatsApp Reply to Team Alert to Weekly Report"
      >
        {paths.map((d, index) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#16304F" strokeWidth="2" />
            {!reduced ? (
              <motion.circle
                r="4"
                fill="#35C4D9"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration: 2.4,
                  delay: index * 0.35,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  repeatDelay: 0.4,
                }}
                style={{ offsetPath: `path('${d}')` }}
              />
            ) : null}
          </g>
        ))}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <rect
              width="88"
              height="32"
              rx="16"
              fill="#0A1A2F"
              stroke="#2BA3B8"
              strokeWidth="1"
            />
            <text
              x="44"
              y="21"
              textAnchor="middle"
              fill="#F4F7F9"
              fontSize="8"
              fontFamily="Figtree, system-ui, sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
