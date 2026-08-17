"use client";

import { useEffect, useState } from "react";
import { features } from "@/data/features";

const ICONS: Record<string, React.ReactNode> = {
  plug: (
    <path
      d="M9 2v5M15 2v5M6 7h12l-1 5a5 5 0 01-10 0L6 7zM12 17v5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  fork: (
    <path
      d="M12 3v6M12 9L6 15v6M12 9l6 6v6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  handCheck: (
    <>
      <path
        d="M5 11V6a2 2 0 014 0v4M9 10V4a2 2 0 014 0v6M13 10V5a2 2 0 014 0v7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 11l-1.5 1.5a2 2 0 000 3l4 4A5 5 0 0011 21h4a5 5 0 005-5v-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  shield: (
    <path
      d="M12 2l8 3.5v6c0 6-4 9-8 10-4-1-8-4-8-10v-6L12 2z M8.5 12l2.5 2.5 5-5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  loopCap: (
    <path
      d="M20 11A8 8 0 106.3 17.7M6.3 17.7H4v-2.3M6.3 17.7L4 20"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  gauge: (
    <>
      <path d="M4 15a8 8 0 1116 0" strokeLinecap="round" />
      <path d="M12 15l4-5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" />
    </>
  ),
};

const SLIDE_SECONDS = 100

export function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // bump to restart the progress-bar animation

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % features.length);
      setCycle((c) => c + 1);
    }, SLIDE_SECONDS * 1000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const feature = features[active];

  return (
    <div className="flex h-full flex-col rounded-sm border border-blueprint-dim bg-ink-raised p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blueprint-dim bg-ink">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#5EC8D8" strokeWidth={1.6}>
            {ICONS[feature.icon]}
          </svg>
        </div>
        <span className="font-mono text-xs text-muted">
          {String(active + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
        </span>
      </div>

      <div key={feature.tag} className="mt-5 flex-1 animate-fade-up">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blueprint">
          {feature.tag}
        </p>
        <h3 className="font-display text-2xl font-medium leading-tight">{feature.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => goTo((active - 1 + features.length) % features.length)}
          aria-label="Previous highlight"
          className="rounded-full border border-blueprint-dim p-1.5 text-muted transition-colors hover:border-signal hover:text-signal"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex flex-1 items-center gap-2">
          {features.map((f, i) => (
            <button
              key={f.tag}
              onClick={() => goTo(i)}
              aria-label={`Show highlight: ${f.title}`}
              aria-current={i === active}
              className="h-1 flex-1 overflow-hidden rounded-full bg-blueprint-dim"
            >
              {i === active && (
                <div
                  key={cycle}
                  className="h-full bg-signal"
                  style={{
                    animation: `progress-fill ${SLIDE_SECONDS}s linear forwards`,
                  }}
                />
              )}
              {i < active && <div className="h-full w-full bg-signal/40" />}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo((active + 1) % features.length)}
          aria-label="Next highlight"
          className="rounded-full border border-blueprint-dim p-1.5 text-muted transition-colors hover:border-signal hover:text-signal"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes progress-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}