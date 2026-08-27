import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.29.150"],
};

export default nextConfig;
