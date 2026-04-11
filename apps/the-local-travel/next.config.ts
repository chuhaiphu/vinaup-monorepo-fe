import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@vinaup/ui', '@vinaup/utils'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
