/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/aiwiki' : '';

const nextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
