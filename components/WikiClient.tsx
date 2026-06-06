'use client';

import { useEffect, useRef } from 'react';

export default function WikiClient({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // Assign IDs to headings for potential anchor linking
    el.querySelectorAll<HTMLElement>('h1, h2, h3').forEach((h, i) => {
      h.id = 'heading-' + i;
    });
  }, [html]);

  return (
    <div className="page-content">
      <div
        className="content"
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
