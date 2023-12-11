/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'momentum-e-user-images.s3.ap-south-1.amazonaws.com', 'momentum-e.s3.ap-south-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
