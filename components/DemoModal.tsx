"use client";

import { useEffect } from "react";
import type { DemoCampaign } from "@/data/demos";

export function DemoModal({
  demo,
  onClose,
}: {
  demo: DemoCampaign;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={demo.tileLabel}
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-blueprint-dim bg-ink-raised"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-blueprint-dim p-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blueprint">
              {demo.tileLabel}
            </p>

            <p className="mt-2 max-w-lg text-sm text-muted">
              &ldquo;{demo.prompt}&rdquo;
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-sm border border-blueprint-dim px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-signal hover:text-signal"
          >
            close
          </button>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-sm border border-blueprint-dim">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={demo.imagePath}
              alt={demo.copy.visual_concept}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-display text-xl font-bold leading-snug">
              {demo.copy.headline}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-bone/90">
              {demo.copy.body_copy}
            </p>

            <dl className="mt-5 space-y-3 border-t border-blueprint-dim pt-4">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">
                  target audience
                </dt>
                <dd className="mt-1 text-sm text-muted">
                  {demo.copy.target_audience}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">
                  call to action
                </dt>
                <dd className="mt-1 text-sm text-muted">
                  {demo.pitch.call_to_action}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">
                  design rationale
                </dt>
                <dd className="mt-1 text-sm text-muted">
                  {demo.pitch.design_rationale}
                </dd>
              </div>
            </dl>

            {demo.audioPath && (
              <div className="mt-5 border-t border-blueprint-dim pt-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">
                  audio script voiceover
                </p>

                <audio
                  controls
                  src={demo.audioPath}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {demo.moodboard.length > 0 && (
          <div className="border-t border-blueprint-dim p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">
              moodboard (image search results)
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {demo.moodboard.map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-sm border border-blueprint-dim"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.imagePath}
                    alt={
                      img.photographer
                        ? `Photo by ${img.photographer}`
                        : "Moodboard reference"
                    }
                    className="aspect-square w-full object-cover"
                  />

                  {img.photographer && (
                    <div className="absolute inset-x-0 bottom-0 bg-ink/80 px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <a
                        href={`${img.unsplashLink || img.photographerProfile}?utm_source=campaign-architect&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[9px] text-bone/80 hover:text-signal"
                      >
                        {img.photographer} / Unsplash
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}