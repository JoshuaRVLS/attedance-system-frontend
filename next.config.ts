import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    backendUrl: "${process.env.NEXT_PUBLIC_API_URL}:8000",
  },
};

export default nextConfig;
