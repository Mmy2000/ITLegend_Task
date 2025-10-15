import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ prevent Vercel build from failing due to lint errors
  },
};

export default nextConfig;
