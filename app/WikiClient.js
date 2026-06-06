'use client';

import { useEffect, useRef, useState } from 'react';
import './globals.css';

export default function WikiClient({ html }) {
  const contentRef = useRef(null);
  const [navItems, setNavItems] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Apply badges
    applyBadges(el);

    // Build nav from headings
    const headings = el.querySelectorAll('h1, h2, h3');
    const items = [];
    headings.forEach((h, i) => {
      const id = 'heading-' + i;
      h.id = id;
      items.push({ id, text: h.textContent, tag: h.tagName });
    });
    setNavItems(items);

    // Intersection observer for active link
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );
    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [html]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSidebarOpen(false);
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <h2>Contents</h2>
        <div className="nav-links">
          {navItems.map(item => (
            <a
              key={item.id}
              href={'#' + item.id}
              className={activeId === item.id ? 'active' : ''}
              style={{ paddingLeft: item.tag === 'H3' ? '32px' : '20px', fontWeight: item.tag === 'H1' ? '600' : undefined }}
              onClick={e => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.text}
            </a>
          ))}
        </div>
      </nav>

      <main className="main">
        <div
          className="content"
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </>
  );
}

function applyBadges(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  nodes.forEach(n => {
    if (!n.textContent.includes('COVERED')) return;

    const parts = n.textContent.split(/(—\s*(?:NOT\s+COVERED|COVERED)(?:\s*\([^)]*\))?)/g);
    if (parts.length === 1) return;

    const frag = document.createDocumentFragment();
    parts.forEach(part => {
      const notMatch = /—\s*(NOT\s+COVERED)(\s*\([^)]*\))?/.exec(part);
      const covMatch = /—\s*(COVERED)(\s*\([^)]*\))?/.exec(part);
      if (notMatch) {
        frag.appendChild(document.createTextNode(' — '));
        const span = document.createElement('span');
        span.className = 'badge-not-covered';
        span.textContent = '🔲 NOT COVERED';
        frag.appendChild(span);
        if (notMatch[2]) frag.appendChild(document.createTextNode(notMatch[2]));
      } else if (covMatch) {
        frag.appendChild(document.createTextNode(' — '));
        const span = document.createElement('span');
        span.className = 'badge-covered';
        span.textContent = '✅ COVERED';
        frag.appendChild(span);
        if (covMatch[2]) frag.appendChild(document.createTextNode(covMatch[2]));
      } else {
        frag.appendChild(document.createTextNode(part));
      }
    });
    n.parentNode.replaceChild(frag, n);
  });
}
