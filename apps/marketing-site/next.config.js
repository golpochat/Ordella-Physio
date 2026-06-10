/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@ordella/ui", "@ordella/shared", "@ordella/utils", "@ordella/config"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
