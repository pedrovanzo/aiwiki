import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing">
      <Image
        src="/omb-ai.png"
        alt="omb-ai logo"
        width={200}
        height={200}
        className="logo-img"
        priority
      />

      <p className="landing-brand">pedrovanzo&apos;s personal wiki</p>

      <h1>
        A place to study and retain <span>AI knowledge.</span>
      </h1>

      <p className="landing-desc">
        Session-by-session notes from studying AI with Claude — covering the Claude ecosystem,
        RAG, memory types, frameworks, and more. Written to actually stick.
      </p>
      <p className="landing-sub">
        Topics are flagged as covered or not covered so it&apos;s always clear where to pick up next.
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
