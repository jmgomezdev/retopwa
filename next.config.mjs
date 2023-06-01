/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // swcMinify: true,
  images: {
    domains: ["d3wo5wojvuv7l.cloudfront.net"],
  },
};

export default nextConfig;
