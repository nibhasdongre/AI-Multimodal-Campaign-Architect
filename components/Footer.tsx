export function Footer() {
  return (
    <footer className="border-t border-blueprint-dim px-6 py-10 text-center">
      <p className="text-sm text-muted">
        Built by{" "}
        {}
        <span className="text-bone">Nibha S Dongre </span> — an agentic MCP pipeline, end to end.
      </p>
      <a
        href="https://github.com/nibhasdongre/AI-Multimodal-Campaign-Architect" /* TODO: replace with your repo URL */
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block font-mono text-sm text-blueprint underline decoration-blueprint-dim underline-offset-4 transition-colors hover:text-signal"
      >
        view the build on GitHub →
      </a>
    </footer>
  );
}
