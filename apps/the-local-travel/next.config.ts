import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@vinaup/ui', '@vinaup/utils'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.haitrieu.com',
      },
    ],
  },
};

export default nextConfig;
