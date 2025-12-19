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

    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://irelis-backend.onrender.com/:path*",
            },
        ];
    },
};

export default nextConfig;
