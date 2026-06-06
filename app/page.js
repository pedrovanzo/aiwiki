import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import WikiClient from './WikiClient';

export default function Home() {
  const mdPath = path.join(process.cwd(), 'ai-concepts.md');
  const raw = fs.readFileSync(mdPath, 'utf-8');
  const html = marked.parse(raw);

  return <WikiClient html={html} />;
}
