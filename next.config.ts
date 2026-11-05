import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/varnam',
        destination: 'https://varnam.vexatech.in',
      },
      {
        source: '/varnam/:path*',
        destination: 'https://varnam.vexatech.in/:path*',
      },
    ];
  },
};

export default nextConfig;
