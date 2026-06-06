export const metadata = {
  title: 'AI Concepts Wiki',
  description: 'A reference page for AI and Claude ecosystem concepts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
