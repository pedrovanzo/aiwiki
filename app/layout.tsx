import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Concepts Wiki',
  description: 'A reference for AI and Claude ecosystem concepts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
