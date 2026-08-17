"use client";

import { useState } from "react";
import { demoCampaigns } from "@/data/demos";
import { DemoModal } from "./DemoModal";

export function DemoGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openDemo = demoCampaigns.find((d) => d.id === openId) ?? null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blueprint">
        run log
      </p>
      <h2 className="font-display text-3xl font-bold sm:text-4xl">Four campaigns, four prompts</h2>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Each tile is a real run through the full pipeline — click one to see the
        generated copy, image, pitch, and voiceover.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {demoCampaigns.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setOpenId(demo.id)}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-blueprint-dim text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={demo.tileImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                view campaign →
              </span>
              <h3 className="font-display text-xl font-bold leading-tight text-bone">
                {demo.tileLabel}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {openDemo && <DemoModal demo={openDemo} onClose={() => setOpenId(null)} />}
    </section>
  );
}
