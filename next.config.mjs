/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["admin.nextpetapp.com", "frontendauth.nextpetapp.com", "frontend.nextpetapp.com"], // Added the new domain
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
