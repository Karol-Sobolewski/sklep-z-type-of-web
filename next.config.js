/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  optimizeFonts: true,
  experimental: {
    gzipSize: true,
  }
}

module.exports = nextConfig
