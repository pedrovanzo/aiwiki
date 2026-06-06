'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/concepts', label: 'AI Concepts' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo-area">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/omb-ai.png"
              alt="omb-ai logo"
              width={40}
              height={40}
              className="sidebar-logo-img"
              priority
            />
          </Link>
          <span className="sidebar-brand">pedrovanzo&apos;s wiki</span>
        </div>

        <p className="sidebar-section-label">Navigation</p>
        <div className="nav-links">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
