/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.nextpetapp.com',
      },
      {
        protocol: 'https',
        hostname: 'frontendauth.nextpetapp.com',
      },
      {
        protocol: 'https',
        hostname: 'frontend.nextpetapp.com',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["admin.nextpetapp.com", "frontendauth.nextpetapp.com", "frontend.nextpetapp.com"], // Added the new domain
//   },
//   experimental: {
//     missingSuspenseWithCSRBailout: false,
//   },
// };

// export default nextConfig;
