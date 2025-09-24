import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'fakestoreapi.com',
      'raw.githubusercontent.com',
      'flagcdn.com',
      'upload.wikimedia.org',
    ],
  },
};

export default nextConfig;
