/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["cdn.shopify.com"]
  }
}

module.exports = nextConfig
