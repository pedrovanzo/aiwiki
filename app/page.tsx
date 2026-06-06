import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing">
      <div className="landing-logo">🧠</div>
      <p className="landing-brand">AI Concepts Wiki</p>

      <h1>
        Your personal <span>AI knowledge</span> reference.
      </h1>

      <p className="landing-desc">
        A curated, session-by-session record of AI concepts explored with Claude —
        covering the Claude ecosystem, RAG, memory types, frameworks, and more.
      </p>
      <p className="landing-sub">
        Concepts are flagged as covered or not covered so you always know where to pick up.
      </p>

      <div className="landing-actions">
        <Link href="/concepts" className="btn-primary">
          Explore concepts
        </Link>
        <a
          href="https://github.com/pedrovanzo/aiwiki"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}
