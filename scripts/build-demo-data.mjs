#!/usr/bin/env node
// scripts/build-demo-data.mjs
//
// Reads campaign_outputs/campaign_*/ (produced by run_demo.py) and:
//   1. copies campaign_image.png, audio.mp3, and moodboard/*.jpg into
//      public/demos/campaign-N/
//   2. writes data/demos.ts with a DemoCampaign entry per campaign
//
// Run: node scripts/build-demo-data.mjs
// Or:  CAMPAIGN_OUTPUTS_DIR=../campaign_outputs node scripts/build-demo-data.mjs
//
// Safe to re-run — it fully regenerates public/demos/ and data/demos.ts
// each time, so stale campaigns don't linger.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Adjust this default if campaign_outputs/ lives somewhere else relative
// to this Next.js project.
const CAMPAIGN_OUTPUTS_DIR = path.resolve(
  PROJECT_ROOT,
  process.env.CAMPAIGN_OUTPUTS_DIR || "../campaign_outputs"
);

const PUBLIC_DEMOS_DIR = path.join(PROJECT_ROOT, "public", "demos");
const DATA_FILE = path.join(PROJECT_ROOT, "data", "demos.ts");

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function copyFileSafe(src, dest) {
  if (!src || !fs.existsSync(src)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

function main() {
  if (!fs.existsSync(CAMPAIGN_OUTPUTS_DIR)) {
    console.error(`❌ campaign_outputs directory not found: ${CAMPAIGN_OUTPUTS_DIR}`);
    console.error(`   Set CAMPAIGN_OUTPUTS_DIR env var if it lives elsewhere.`);
    process.exit(1);
  }

  const campaignDirs = fs
    .readdirSync(CAMPAIGN_OUTPUTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^campaign_\d+$/.test(d.name))
    .sort((a, b) => {
      const na = parseInt(a.name.split("_")[1], 10);
      const nb = parseInt(b.name.split("_")[1], 10);
      return na - nb;
    });

  if (campaignDirs.length === 0) {
    console.error(`❌ No campaign_N folders found under ${CAMPAIGN_OUTPUTS_DIR}`);
    process.exit(1);
  }

  // Fresh start each run.
  fs.rmSync(PUBLIC_DEMOS_DIR, { recursive: true, force: true });

  const entries = [];

  for (const dirEnt of campaignDirs) {
    const n = dirEnt.name.split("_")[1];
    const srcDir = path.join(CAMPAIGN_OUTPUTS_DIR, dirEnt.name);
    const destDir = path.join(PUBLIC_DEMOS_DIR, `campaign-${n}`);
    const publicPrefix = `/demos/campaign-${n}`;

    const final = readJsonSafe(path.join(srcDir, "final.json"));
    if (!final) {
      console.warn(`⚠️  Skipping ${dirEnt.name}: no readable final.json`);
      continue;
    }

    const campaignMeta = final.campaign || {};
    const copyData = final.copy || {};
    const parallel = final.parallel || {};
    const pitchData = parallel.pitch?.data || {};

    // --- campaign image ---
    let imagePath = "";
    const imageOk =
      copyFileSafe(
        path.join(srcDir, "campaign_image.png"),
        path.join(destDir, "campaign_image.png")
      );
    if (imageOk) imagePath = `${publicPrefix}/campaign_image.png`;
    else console.warn(`⚠️  ${dirEnt.name}: no campaign_image.png found`);

    // --- audio ---
    let audioPath = "";
    const audioOk = copyFileSafe(
      path.join(srcDir, "audio.mp3"),
      path.join(destDir, "audio.mp3")
    );
    if (audioOk) audioPath = `${publicPrefix}/audio.mp3`;

    // --- moodboard ---
    const moodboardMeta = readJsonSafe(path.join(srcDir, "moodboard.json")) || [];
    const moodboardSrcDir = path.join(srcDir, "moodboard");
    const moodboard = [];

    if (fs.existsSync(moodboardSrcDir)) {
      const files = fs
        .readdirSync(moodboardSrcDir)
        .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
        .sort();

      for (const file of files) {
        const ok = copyFileSafe(
          path.join(moodboardSrcDir, file),
          path.join(destDir, "moodboard", file)
        );
        if (!ok) continue;

        // Match this file back to its metadata entry via local_path's basename.
        const meta = moodboardMeta.find(
          (m) => m.local_path && path.basename(m.local_path) === file
        );

        moodboard.push({
          imagePath: `${publicPrefix}/moodboard/${file}`,
          photographer: meta?.photographer || undefined,
          photographerProfile: meta?.photographer_profile || undefined,
          unsplashLink: meta?.unsplash_link || undefined,
        });
      }
    }

    if (moodboard.length === 0) {
      console.warn(`⚠️  ${dirEnt.name}: no moodboard images found`);
    }

    const tileImage = moodboard[0]?.imagePath || imagePath || "";

    entries.push({
      id: `demo-${n}`,
      tileLabel: campaignMeta.name || `Campaign ${n}`,
      tileImage,
      prompt: campaignMeta.prompt || "",
      copy: {
        headline: copyData.headline || "",
        body_copy: copyData.body_copy || "",
        target_audience: copyData.target_audience || "",
        core_message: copyData.core_message || "",
        visual_concept: copyData.visual_concept || "",
      },
      pitch: {
        call_to_action: pitchData.call_to_action || "",
        design_rationale: pitchData.design_rationale || "",
      },
      imagePath,
      audioPath,
      moodboard,
    });

    console.log(`✅ Processed ${dirEnt.name} → ${entries[entries.length - 1].tileLabel}`);
  }

  const fileContents = `// data/demos.ts
//
// AUTO-GENERATED by scripts/build-demo-data.mjs — do not hand-edit.
// Source: ${path.relative(PROJECT_ROOT, CAMPAIGN_OUTPUTS_DIR)}
// Regenerate with: npm run build:demo-data

export type MoodboardImage = {
  imagePath: string;
  photographer?: string;
  photographerProfile?: string;
  unsplashLink?: string;
};

export type DemoCampaign = {
  id: string;
  tileLabel: string;
  tileImage: string;
  prompt: string;
  copy: {
    headline: string;
    body_copy: string;
    target_audience: string;
    core_message: string;
    visual_concept: string;
  };
  pitch: {
    call_to_action: string;
    design_rationale: string;
  };
  imagePath: string;
  audioPath: string;
  moodboard: MoodboardImage[];
};

export const demoCampaigns: DemoCampaign[] = ${JSON.stringify(entries, null, 2)};
`;

  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, fileContents, "utf-8");

  console.log(`\n✅ Wrote ${entries.length} campaign(s) to ${path.relative(PROJECT_ROOT, DATA_FILE)}`);
  console.log(`✅ Assets copied to ${path.relative(PROJECT_ROOT, PUBLIC_DEMOS_DIR)}`);
}

main();