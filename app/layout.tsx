import type { Metadata } from 'next';
import AppSidebar from '@/components/AppSidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Concepts Wiki',
  description: 'A reference for AI and Claude ecosystem concepts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <AppSidebar />
          <div className="app-main">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
