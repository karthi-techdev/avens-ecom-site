// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '3001', // Your backend port
//       },
//       {
//         protocol: 'https',
//         hostname: 'via.placeholder.com',
//       },
//     ],
//   },
// };

// export default nextConfig;

module.exports = {
  images: {
    domains: ['localhost'],
  },
};