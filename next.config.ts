// --- Next.js Configuration ---

// Why: We whitelist Strapi's dev hosts so `next/image` can load CMS media safely.
// Note: We include both `localhost` and `127.0.0.1` because dev setups commonly
// mix them (frontend vs CMS), and Next treats them as different hosts.
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
