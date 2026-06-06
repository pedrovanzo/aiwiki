import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import WikiClient from '@/components/WikiClient';

function applyBadges(html: string): string {
  return html
    .replace(/— NOT COVERED(\s*\([^)]*\))?/g, (_, note) =>
      `<span class="badge-not-covered">🔲 NOT COVERED</span>${note ?? ''}`)
    .replace(/— COVERED(\s*\([^)]*\))?/g, (_, note) =>
      `<span class="badge-covered">✅ COVERED</span>${note ?? ''}`);
}

export default function ConceptsPage() {
  const mdPath = path.join(process.cwd(), 'ai-concepts.md');
  const raw = fs.readFileSync(mdPath, 'utf-8');
  const html = applyBadges(marked.parse(raw) as string);

  return <WikiClient html={html} />;
}
