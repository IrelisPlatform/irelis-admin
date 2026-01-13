import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,

    turbopack: {
        root: __dirname,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
        ],
    },

    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://3.142.99.119",
        "http://127.0.0.1:3000"
      ]
    }
  }
};

export default nextConfig;
