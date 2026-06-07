import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import MarkdownPage from '@/components/MarkdownPage';
import { SLUGS } from '@/lib/slugs';

export function generateStaticParams() {
  return SLUGS.map(slug => ({ slug }));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!SLUGS.includes(slug)) notFound();

  const mdPath = path.join(process.cwd(), 'content', `${slug}.md`);

  if (!fs.existsSync(mdPath)) {
    const html = marked.parse(`# ${slug.replace(/-/g, ' ')}\n\n*Content coming soon.*`) as string;
    return <MarkdownPage html={html} />;
  }

  const raw = fs.readFileSync(mdPath, 'utf-8');
  const html = marked.parse(raw) as string;
  return <MarkdownPage html={html} />;
}
