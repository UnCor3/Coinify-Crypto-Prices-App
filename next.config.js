/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cryptocompare.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'resources.cryptocompare.com',
        port: '',
        pathname: '/asset-management/**',
      },
    ],
  },
}

module.exports = nextConfig
