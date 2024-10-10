/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    assetPrefix: '/travel-together',
    basePath: '/travel-together',
    publicRuntimeConfig: {
        basePath: '/travel-together',
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.giphy.com',
            },
        ],
    },
};

export default nextConfig;
