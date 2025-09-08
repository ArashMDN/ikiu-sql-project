/** @type {import('next').NextConfig} */
const nextConfig = {
  // External packages for server components  
  serverExternalPackages: ["@prisma/client", "prisma"],

  // Webpack configuration for Prisma
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );

    return config;
  },

  // Static file serving
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  // Output configuration for deployment
  output: "standalone",
};

export default nextConfig;
