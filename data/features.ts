export type Feature = {
  tag: string; // real tool/concept name, mono-font
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    tag: "model context protocol",
    title: "Real MCP, not a simulated one",
    description:
      "Client and server run as genuinely separate processes over JSON-RPC — tool discovery reflects the server's live decorators, nothing is hardcoded on the client.",
  },
  {
    tag: "asyncio.gather",
    title: "Parallel tool execution",
    description:
      "Moodboard search, voiceover generation, pitch synthesis, and guardrail checks all fan out concurrently once copy generation completes — bounded by the slowest call, not their sum.",
  },
  {
    tag: "human in the loop",
    title: "A checkpoint before the expensive step",
    description:
      "Image generation waits for a person to confirm or override the visual direction after reviewing a cheap moodboard — no silent spend on a direction nobody approved.",
  },
  {
    tag: "run llm_guardrail check",
    title: "Two-layer guardrails",
    description:
      "Fast rule-based checks catch obvious issues instantly; a model-based pass catches unverifiable claims and tone drift that keyword matching misses.",
  },
  {
    tag: "refine content",
    title: "Bounded auto-critique",
    description:
      "A failed guardrail check triggers exactly one automatic rewrite attempt — never an open-ended retry loop — and logs what happened either way.",
  },
  {
    tag: "session cost usd",
    title: "Real cost tracking, hard cap",
    description:
      "Every paid call reports its actual token usage back to the orchestrator. Cross a budget cap and further paid calls are refused outright, before they're placed.",
  },
];
