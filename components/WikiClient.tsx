'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  text: string;
  tag: string;
}

export default function WikiClient({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const headings = el.querySelectorAll<HTMLElement>('h1, h2, h3');
    const items: NavItem[] = [];
    headings.forEach((h, i) => {
      const id = 'heading-' + i;
      h.id = id;
      items.push({ id, text: h.textContent ?? '', tag: h.tagName });
    });
    setNavItems(items);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );
    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [html]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSidebarOpen(false);
  }

  return (
    <div className="wiki-layout">
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-back">← Home</Link>
        </div>
        <p className="sidebar-section-label">Contents</p>
        <div className="nav-links">
          {navItems.map(item => (
            <a
              key={item.id}
              href={'#' + item.id}
              className={activeId === item.id ? 'active' : ''}
              style={{
                paddingLeft: item.tag === 'H3' ? '32px' : '20px',
                fontWeight: item.tag === 'H1' ? '600' : undefined,
              }}
              onClick={e => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.text}
            </a>
          ))}
        </div>
      </nav>

      <main className="wiki-main">
        <div
          className="content"
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}
