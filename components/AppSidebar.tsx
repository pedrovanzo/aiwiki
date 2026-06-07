'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  num: string;
  label: string;
  slug: string;
  notCovered?: boolean;
}

interface NavSection {
  num: string;
  label: string;
  icon: string;
  partiallyCovered?: boolean;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    num: 'I',
    label: 'Core AI Concepts',
    icon: '🧠',
    items: [
      { num: '1.1', label: 'What is RAG', slug: 'what-is-rag' },
      { num: '1.2', label: 'RAG vs Manual Context Injection', slug: 'rag-vs-manual-context' },
      { num: '1.3', label: 'Language & Output Quality', slug: 'language-output-quality' },
    ],
  },
  {
    num: 'II',
    label: 'Agentic AI',
    icon: '🤖',
    items: [
      { num: '2.1', label: 'What is Agentic AI', slug: 'what-is-agentic-ai' },
      { num: '2.2', label: 'Agentic Memory', slug: 'agentic-memory' },
      { num: '2.3', label: 'Memory Types & Usage Guide', slug: 'memory-types' },
      { num: '2.4', label: 'Memory Frameworks', slug: 'memory-frameworks' },
      { num: '2.5', label: 'RAG Pipeline — Components', slug: 'rag-pipeline-components' },
      { num: '2.6', label: 'RAG Pipeline — Implementation', slug: 'rag-pipeline-implementation' },
      { num: '2.7', label: 'RAG Frameworks & Tools', slug: 'rag-frameworks' },
      { num: '2.8', label: 'Subagents', slug: 'subagents' },
      { num: '2.9', label: 'MCP Servers', slug: 'mcp-servers', notCovered: true },
    ],
  },
  {
    num: 'III',
    label: 'The Claude Ecosystem',
    icon: '🔷',
    items: [
      { num: '3.1', label: 'Claude Products Overview', slug: 'claude-products' },
      { num: '3.2', label: 'CLAUDE.md', slug: 'claude-md' },
      { num: '3.3', label: 'Skills', slug: 'skills' },
      { num: '3.4', label: 'Hooks', slug: 'hooks' },
      { num: '3.5', label: 'The Task Tool', slug: 'task-tool' },
      { num: '3.6', label: 'MCP Servers in Claude', slug: 'mcp-servers-claude', notCovered: true },
      { num: '3.7', label: 'Multilingual Usage', slug: 'multilingual-usage' },
    ],
  },
  {
    num: 'IV',
    label: 'RAG & Knowledge Pipelines',
    icon: '📚',
    partiallyCovered: true,
    items: [
      { num: '4.1', label: 'When to Use RAG', slug: 'when-to-use-rag' },
      { num: '4.2', label: 'Choosing a Vector Database', slug: 'vector-databases' },
      { num: '4.3', label: 'Choosing an Embedding Model', slug: 'embedding-models', notCovered: true },
      { num: '4.4', label: 'Prompt Engineering for RAG', slug: 'prompt-engineering-rag', notCovered: true },
    ],
  },
  {
    num: 'V',
    label: 'Hands-On Reference',
    icon: '🗂️',
    items: [
      { num: '5.1', label: 'Memory Type Decision Table', slug: 'memory-decision-table' },
      { num: '5.2', label: 'RAG vs Skills vs CLAUDE.md', slug: 'rag-vs-skills-vs-claude-md' },
      { num: '5.3', label: 'Framework Comparison Table', slug: 'framework-comparison' },
    ],
  },
  {
    num: 'VI',
    label: 'Preferred Systems & Tools',
    icon: '⚙️',
    items: [
      { num: '6.1', label: 'LLM Preferences & Usage Patterns', slug: 'llm-preferences', notCovered: true },
    ],
  },
  {
    num: 'VII',
    label: 'Standalone Questions & Principles',
    icon: '💡',
    items: [
      { num: '7.1', label: 'Context Windows in Claude\'s Ecosystem', slug: 'context-windows', notCovered: true },
      { num: '7.2', label: 'Multi LLM Usage', slug: 'multi-llm-usage', notCovered: true },
      { num: '7.3', label: 'Learning with LLMs', slug: 'learning-with-llms', notCovered: true },
      { num: '7.4', label: 'Delegating Tasks to AI', slug: 'delegating-to-ai', notCovered: true },
    ],
  },
];

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggle(num: string) {
    setExpanded(e => ({ ...e, [num]: !e[num] }));
  }

  function close() { setOpen(false); }

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle navigation">
        ☰
      </button>

      <nav className={`sidebar${open ? ' open' : ''}`}>
        {/* Logo */}
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

        {/* Home */}
        <div className="nav-groups">
          <Link
            href="/"
            className={`nav-item${pathname === '/' ? ' active' : ''}`}
            onClick={close}
          >
            🏠 Home
          </Link>

          {/* Sections */}
          {NAV.map(section => {
            const isOpen = expanded[section.num] ?? false;
            const sectionActive = section.items.some(
              i => pathname === `/topics/${i.slug}`
            );

            return (
              <div key={section.num} className="nav-group">
                <button
                  className={`nav-group-header${sectionActive ? ' active' : ''}`}
                  onClick={() => toggle(section.num)}
                  aria-expanded={isOpen}
                >
                  <span className="nav-group-label">
                    <span className="nav-group-icon">{section.icon}</span>
                    <span className="nav-group-text">
                      {section.label}
                    </span>
                    {section.partiallyCovered && (
                      <span className="badge-partial" title="Partially covered">~</span>
                    )}
                  </span>
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
                          title={item.notCovered ? 'Not yet covered' : undefined}
                        >
                          <span className="nav-child-label">{item.label}</span>
                          {item.notCovered && <span className="nav-child-dot" />}
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
