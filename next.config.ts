import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack 配置
  turbopack: {},
  // 启用文件轮询，确保在特殊挂载路径下 HMR 正常工作
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  // 开发服务器配置：使用 webpack 模式以确保文件轮询生效
  devIndicators: false,
};

export default nextConfig;
