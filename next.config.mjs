/** @type {import('next').NextConfig} */
import withPWA from "@imbios/next-pwa";
import runtimeCaching from "@imbios/next-pwa/cache.js";

const isProduction = process.env.NODE_ENV === "production";

const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // swcMinify: true,
  images: {
    domains: ["d3wo5wojvuv7l.cloudfront.net"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: true,
  },
};

const nextConfig = withPWA({
  dest: "public",
  // scope: "/app",
  disable: !isProduction,
  runtimeCaching,
  buildExcludes: ["app-build-manifest.json"],
})(config);

export default nextConfig;
