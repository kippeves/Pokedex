import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "pokeapi.com" },
    ],
  },
};

export default nextConfig;
