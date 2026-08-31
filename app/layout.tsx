import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import { site } from '@/content';
import './globals.css';

export const metadata: Metadata = {
  // TODO_CLIENT_companyName flows through here too -- one edit in content/site.ts.
  title: {
    default: `${site.companyName} — technology services`,
    template: `%s — ${site.companyName}`,
  },
  description: site.shortDescription,
  robots: { index: false, follow: false }, // showcase build, not for indexing
};

export const viewport: Viewport = {
  themeColor: '#14120e',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables}>
      <body className="bg-ground text-fg font-sans antialiased">{children}</body>
    </html>
  );
}
