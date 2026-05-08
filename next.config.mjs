/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "openhubdigital.com" },
      { protocol: "http", hostname: "openhubdigital.com" },
    ],
  },
  async redirects() {
    return [
      // Old date-based WordPress URLs → new insights
      { source: "/:year/:month/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/:year/:month/:day/:slug", destination: "/insights/:slug", permanent: true },
      // Old category / tag prefixes
      { source: "/category/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/tag/:slug", destination: "/insights/:slug", permanent: true },
    ];
  },
};
export default nextConfig;