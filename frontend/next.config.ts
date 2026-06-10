import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;