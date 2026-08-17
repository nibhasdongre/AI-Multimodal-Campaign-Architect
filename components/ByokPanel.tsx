export function ByokPanel() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="rounded-sm border border-blueprint-dim bg-ink-raised p-6 sm:p-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blueprint">
          run it yourself
        </p>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Clone it, but BYOK : Bring your own keys
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          The tiles above are real output from this project&apos;s pipeline.
          
Clone the repo and run the same four campaigns (or your own
          prompts) end-to-end with your own API keys.
        </p>

        <pre className="mt-5 overflow-x-auto rounded-sm border border-blueprint-dim bg-ink p-4 font-mono text-xs text-bone/90">
{`git clone https://github.com/nibhasdongre/AI-Multimodal-Campaign-Architect
cd AI-Multimodal-Campaign-Architect
pip install -r requirements.txt

# .env
GEMINI_API_KEY=your_key_here
UNSPLASH_ACCESS_KEY=your_key_here

python server.py
python run_demo.py `}
        </pre>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">copy + pitch</dt>
            <dd className="mt-1 text-sm text-muted">Gemini : needs GEMINI_API_KEY</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">moodboard</dt>
            <dd className="mt-1 text-sm text-muted">Unsplash - Image Search : needs UNSPLASH_ACCESS_KEY</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">Image Generation</dt>
            <dd className="mt-1 text-sm text-muted">Pollinations.ai : Python SDK.</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-blueprint">audio</dt>
            <dd className="mt-1 text-sm text-muted"> gTTS : Google Text-to-Speech </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}