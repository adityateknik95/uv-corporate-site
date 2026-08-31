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
    <html lang="en-IN" id="top" className={fontVariables}>
      <body className="bg-ground text-fg font-sans antialiased">
        {/* Off-screen until focused. First stop for a keyboard user, and the
            only way past a nav this size without ~20 tab presses. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:text-small focus:text-ground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
