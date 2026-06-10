/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: [
    "@ordella/ui",
    "@ordella/shared",
    "@ordella/utils",
    "@ordella/config",
    "@ordella/validation",
    "@ordella/security",
  ],
};

module.exports = nextConfig;
