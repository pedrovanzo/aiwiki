'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SubItem {
  label: string;
  href?: string;
  children?: SubItem[];
  suggested?: boolean;
}

interface NavGroup {
  label: string;
  icon: string;
  href?: string;
  suggested?: boolean;
  children?: SubItem[];
}

const NAV: NavGroup[] = [
  {
    label: 'Welcome & Introduction',
    icon: '🌐',
    children: [
      { label: 'Getting Started' },
      { label: 'Study Roadmap' },
    ],
  },
  {
    label: 'AI Basics & Foundations',
    icon: '🧊',
    children: [
      { label: 'Neural Networks Overview', suggested: true },
      { label: 'Transformers Architecture', suggested: true },
      { label: 'Tokenization & Context Windows', suggested: true },
    ],
  },
  {
    label: 'Large Language Models (LLMs)',
    icon: '💬',
    children: [
      { label: 'Overview & Core Concepts' },
      { label: 'Major Edge Cases & Limitations' },
      { label: 'LLM Evaluation Metrics', suggested: true },
    ],
  },
  {
    label: 'LLM Tools Ecosystem',
    icon: '🛠️',
    children: [
      { label: 'Google Gemini' },
      { label: 'OpenAI ChatGPT' },
      { label: 'Anthropic Claude' },
    ],
  },
  {
    label: 'Prompt Engineering',
    icon: '🧠',
    children: [
      { label: 'Zero-Shot Prompting' },
      { label: 'Few-Shot Prompting', suggested: true },
      { label: 'Chain-of-Thought (CoT) Prompting' },
      { label: 'System Prompts & Personas', suggested: true },
    ],
  },
  {
    label: 'RAG',
    icon: '📚',
    children: [
      { label: 'Introduction to RAG', href: '/concepts' },
      { label: 'Vector Databases & Embeddings', suggested: true },
      { label: 'Naive RAG vs. Advanced RAG', suggested: true },
      { label: 'RAG Common Failure Points', suggested: true },
    ],
  },
  {
    label: 'Agentic AI',
    icon: '🤖',
    children: [
      { label: 'Introduction to Agents' },
      { label: 'Core Agent Architecture', suggested: true },
      {
        label: 'Agentic AI Memory',
        children: [
          { label: 'Short-Term / Conversation Memory' },
          { label: 'Long-Term / Semantic Memory' },
        ],
      },
      { label: 'Tools & Function Calling' },
      { label: 'Multi-Agent Orchestration', suggested: true },
      { label: 'Edge Cases Requiring Agents' },
    ],
  },
  {
    label: 'Advanced AI Concepts',
    icon: '🔬',
    suggested: true,
    children: [
      { label: 'Fine-Tuning vs. RAG', suggested: true },
      { label: 'Local LLMs & Quantization', suggested: true },
      { label: 'AI Safety & Alignment', suggested: true },
    ],
  },
  {
    label: 'Resources & Links',
    icon: '📖',
    children: [
      { label: 'Useful Study URLs' },
      { label: 'Research Papers' },
      { label: 'Tool Documentation' },
    ],
  },
];

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function NavChildItem({ item, depth = 0, onClose }: { item: SubItem; depth?: number; onClose: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href ? pathname === item.href : false;

  const paddingLeft = 32 + depth * 12;

  if (hasChildren) {
    return (
      <div>
        <button
          className={`nav-child nav-child-group${isActive ? ' active' : ''}`}
          style={{ paddingLeft }}
          onClick={() => setOpen(o => !o)}
        >
          <span>{item.label}</span>
          <svg className={`nav-chevron${open ? ' open' : ''}`} width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open && (
          <div>
            {item.children!.map(child => (
              <NavChildItem key={child.label} item={child} depth={depth + 1} onClose={onClose} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`nav-child${isActive ? ' active' : ''}${item.suggested ? ' suggested' : ''}`}
        style={{ paddingLeft }}
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <span
      className={`nav-child nav-child-mock${item.suggested ? ' suggested' : ''}`}
      style={{ paddingLeft }}
    >
      {item.label}
    </span>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Welcome & Introduction': true,
  });

  function toggle(label: string) {
    setExpanded(e => ({ ...e, [label]: !e[label] }));
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo-area">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src={`${BASE}/omb-ai.png`}
              alt="omb-ai logo"
              width={40}
              height={40}
              className="sidebar-logo-img"
              priority
              unoptimized
            />
          </Link>
          <span className="sidebar-brand">pedrovanzo&apos;s wiki</span>
        </div>

        <div className="nav-groups">
          {/* Home — plain link */}
          <Link
            href="/"
            className={`nav-item${pathname === '/' ? ' active' : ''}`}
            onClick={() => setOpen(false)}
          >
            🏠 Home
          </Link>

          {/* Topic groups */}
          {NAV.map(group => {
            const isOpen = expanded[group.label] ?? false;

            return (
              <div key={group.label} className="nav-group">
                <button
                  className={`nav-group-header${group.suggested ? ' suggested' : ''}`}
                  onClick={() => toggle(group.label)}
                  aria-expanded={isOpen}
                >
                  <span className="nav-group-label">
                    <span className="nav-group-icon">{group.icon}</span>
                    {group.label}
                    {group.suggested && <span className="badge-suggested" title="Suggested by Gemini">✦</span>}
                  </span>
                  <svg
                    className={`nav-chevron${isOpen ? ' open' : ''}`}
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {isOpen && (
                  <div className="nav-children">
                    {group.children?.map(child => (
                      <NavChildItem key={child.label} item={child} onClose={() => setOpen(false)} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
