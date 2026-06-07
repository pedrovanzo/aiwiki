'use client';

import { useEffect, useRef } from 'react';

export default function MarkdownPage({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>('h1,h2,h3,h4').forEach((h, i) => {
      h.id = 'h-' + i;
    });
  }, [html]);

  return (
    <div className="page-content">
      <div
        className="content"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
