import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 空 turbopack 配置，允许 Vercel 使用 Turbopack 构建
  turbopack: {},
  // 启用文件轮询，确保在特殊挂载路径下 HMR 正常工作（仅本地开发 --webpack 模式生效）
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
