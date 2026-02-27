/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Replace YOUR_REPO_NAME with Profile-Website
  basePath: process.env.NODE_ENV === "production" ? "/Profile-Website" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Profile-Website/" : "",
};

module.exports = nextConfig;