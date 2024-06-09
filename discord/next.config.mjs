/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'discord.com',
            port: '',
            pathname: '/assets/**',
          },
          
        ],
        domains: ['localhost'] ,
    },
};

export default nextConfig;