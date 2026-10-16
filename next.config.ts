import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Proxy /api/* to the Render backend so the browser only talks to the
  // Vercel domain (first-party cookies). BACKEND_URL is read at build time.
  async rewrites() {
    const backend = process.env.BACKEND_URL?.replace(/\/+$/, "");
    if (!backend) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
