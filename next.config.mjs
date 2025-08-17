/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'images-assets.nasa.gov',
      },
    ],
  },
};

export default nextConfig;
