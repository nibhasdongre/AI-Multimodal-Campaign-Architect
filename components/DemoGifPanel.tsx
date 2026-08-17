"use client";

import { useState } from "react";

export function DemoGifPanel() {
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-sm border border-blueprint-dim bg-ink-raised"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        src="/demo.mp4"
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={showControls}
      />
    </div>
  );
}