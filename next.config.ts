import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', 
        // Add any other allowed origins
      ],
      // Optional additional configurations
      bodySizeLimit: '5mb'
    }
  },
  images: {
    domains: ["images.unsplash.com"], // Add any other external domains here
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ["@svgr/webpack"], // Enables SVGs to be imported as React components
    });
    return config;
  },
};

export default nextConfig;
