import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack 配置 (Next.js 16 默认)
  turbopack: {
    // 启用热更新
  },
};

export default nextConfig;
