/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  optimizeFonts: true,
  experimental: {
    gzipSize: true,
  },
  async redirects() {
    return [
      {
        source: '/wyroby/strona/1',
        destination: '/wyroby/',
        permanent: true,
      },
    ]
  }, 
  images: {
    domains: [`naszsklep-api.vercel.app`, `media.graphassets.com`],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
