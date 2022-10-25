/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // config.resolve.alias["ioredis"] = false;
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }
    return config;
  },
};

module.exports = nextConfig;
