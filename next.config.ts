import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com', 'placehold.co'], // Thêm Cloudinary vào danh sách cho phép
    dangerouslyAllowSVG: true, // ✅ Cho phép SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", 
  },
};

export default nextConfig;
