import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    backendUrl: 'http://192.168.100.7:8000'
  }
};

export default nextConfig;
