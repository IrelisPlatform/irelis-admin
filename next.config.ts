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
                source: "/auth/otp/check-mail",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/auth/otp/check-mail",
            },
            {
                source: "/auth/otp/request",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/auth/otp/request",
            },
            {
                source: "/api/v1/jobs/published",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/api/v1/jobs/published",
            },
            {
                source: "/auth/otp/resend",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/auth/otp/resend",
            },
            {
                source: "/auth/otp/verify",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/auth/otp/verify",
            },
            {
                source: "/auth/otp/user",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/auth/otp/user",
            },
            {
                source: "/auth/otp/refresh",
                destination: "http://api-irelis.us-east-2.elasticbeanstalk.com/auth/otp/refresh",
            },


        ];
    }
};

export default nextConfig;
