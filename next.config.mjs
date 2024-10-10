/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    assetPrefix: '/travel-together',  // Без завершающего слэша
    basePath: '/travel-together',     // Без завершающего слэша
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
