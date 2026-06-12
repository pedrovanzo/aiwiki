'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  label: string;
  slug: string;
  notCovered?: boolean;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    label: 'Fundaments',
    items: [
      { label: 'What is RAG', slug: 'what-is-rag' },
      { label: 'What is Agentic AI', slug: 'what-is-agentic-ai' },
      { label: 'Context Windows', slug: 'context-windows', notCovered: true },
      { label: 'Language & Output Quality', slug: 'language-output-quality' },
    ],
  },
  {
    label: 'Core Concepts',
    items: [
      { label: 'RAG vs Manual Context Injection', slug: 'rag-vs-manual-context' },
      { label: 'Memory Types & Usage Guide', slug: 'memory-types' },
      { label: 'Agentic Memory', slug: 'agentic-memory' },
      { label: 'Subagents', slug: 'subagents' },
      { label: 'Multi LLM Usage', slug: 'multi-llm-usage', notCovered: true },
      { label: 'Multilingual Usage', slug: 'multilingual-usage' },
      { label: 'MCP Servers', slug: 'mcp-servers', notCovered: true },
    ],
  },
  {
    label: 'AI Products',
    items: [
      { label: 'Claude Products Overview', slug: 'claude-products' },
    ],
  },
  {
    label: 'AI Solutions',
    items: [
      { label: 'When to Use RAG', slug: 'when-to-use-rag' },
      { label: 'RAG Pipeline — Components', slug: 'rag-pipeline-components' },
      { label: 'RAG Pipeline — Implementation', slug: 'rag-pipeline-implementation' },
      { label: 'Memory Frameworks', slug: 'memory-frameworks' },
      { label: 'RAG Frameworks & Tools', slug: 'rag-frameworks' },
      { label: 'Vector Databases', slug: 'vector-databases' },
      { label: 'Embedding Models', slug: 'embedding-models', notCovered: true },
      { label: 'Prompt Engineering for RAG', slug: 'prompt-engineering-rag', notCovered: true },
    ],
  },
  {
    label: 'Claude Ecosystem',
    items: [
      { label: 'CLAUDE.md', slug: 'claude-md' },
      { label: 'Skills', slug: 'skills' },
      { label: 'Hooks', slug: 'hooks' },
      { label: 'The Task Tool', slug: 'task-tool' },
      { label: 'MCP Servers in Claude', slug: 'mcp-servers-claude', notCovered: true },
    ],
  },
  {
    label: 'Other AI Ecosystems',
    items: [
      { label: 'LLM Preferences & Usage Patterns', slug: 'llm-preferences', notCovered: true },
    ],
  },
  {
    label: 'Reference & Practice',
    items: [
      { label: 'Memory Type Decision Table', slug: 'memory-decision-table' },
      { label: 'RAG vs Skills vs CLAUDE.md', slug: 'rag-vs-skills-vs-claude-md' },
      { label: 'Framework Comparison Table', slug: 'framework-comparison' },
    ],
  },
  {
    label: 'Personal Thoughts',
    items: [
      { label: 'Learning with LLMs', slug: 'learning-with-llms', notCovered: true },
      { label: 'Delegating Tasks to AI', slug: 'delegating-to-ai', notCovered: true },
    ],
  },
];

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggle(label: string) {
    setExpanded(e => ({ ...e, [label]: !e[label] }));
  }

  function close() { setOpen(false); }

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle navigation">
        ☰
      </button>

      <nav className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo-area">
          <Link href="/" onClick={close}>
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
          <Link
            href="/"
            className={`nav-item${pathname === '/' ? ' active' : ''}`}
            onClick={close}
          >
            Home
          </Link>

          {NAV.map(section => {
            const isOpen = expanded[section.label] ?? false;
            const sectionActive = section.items.some(
              i => pathname === `/topics/${i.slug}`
            );

            return (
              <div key={section.label} className="nav-group">
                <button
                  className={`nav-group-header${sectionActive ? ' active' : ''}`}
                  onClick={() => toggle(section.label)}
                  aria-expanded={isOpen}
                >
                  <span className="nav-group-label">{section.label}</span>
                  <svg
                    className={`nav-chevron${isOpen ? ' open' : ''}`}
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="nav-children">
                    {section.items.map(item => {
                      const isActive = pathname === `/topics/${item.slug}`;
                      return (
                        <Link
                          key={item.slug}
                          href={`/topics/${item.slug}`}
                          className={`nav-child${isActive ? ' active' : ''}${item.notCovered ? ' not-covered' : ''}`}
                          onClick={close}
                        >
                          <span className="nav-child-label">{item.label}</span>
                        </Link>
                      );
                    })}
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
