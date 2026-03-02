import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // beforeFiles runs before filesystem routing (pages/app)
      beforeFiles: [
        {
          source: '/',
          destination: '/index.html',
        },
        {
          source: '/combos',
          destination: '/combos.html',
        },
        {
          source: '/best-practices',
          destination: '/best-practices.html',
        },
      ],
    };
  },
};

export default nextConfig;
