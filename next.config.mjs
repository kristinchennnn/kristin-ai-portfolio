/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ["takumi-pdf", "@takumi-rs/helpers"],
};

export default nextConfig;
