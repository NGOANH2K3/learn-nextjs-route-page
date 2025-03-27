import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'], // Thêm Cloudinary vào danh sách cho phép
  },
};

export default nextConfig;
