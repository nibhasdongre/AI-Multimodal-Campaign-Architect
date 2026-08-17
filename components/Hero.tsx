import { PipelineDiagram } from "./PipelineDiagram";

export function Hero() {
  return (
    <section className="relative bg-grid-blueprint bg-grid px-6 pt-24 pb-16 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-blueprint">
        agentic workflow · model context protocol
      </p>
      <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
        AI Multimodal Campaign Architect
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
        An agentic MCP pipeline that plans, writes, illustrates, and voices a full
        marketing campaign — with a human in the loop.
      </p>

      <div className="mx-auto mt-12 max-w-4xl">
        <PipelineDiagram />
      </div>
    </section>
  );
}
