/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
