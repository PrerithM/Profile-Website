const isProd = process.env.NODE_ENV === "production";

// Your repository name is Profile-Website
const repoName = "Profile-Website";

const nextConfig = {
  output: "export",
  // This ensures the site works under username.github.io/Profile-Website/
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;