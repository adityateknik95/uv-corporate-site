import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const nextConfig: NextConfig = {
  // Pin the workspace root; otherwise Turbopack walks up and guesses from a
  // stray lockfile further up the user directory.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  // Static export: the whole site is prerendered to /out and can be hosted anywhere.
  output: 'export',
  // next/image's optimiser needs a server; static export has none.
  images: { unoptimized: true },
  // Trailing slashes keep static hosts from redirecting on directory URLs.
  trailingSlash: true,
};

export default nextConfig;
