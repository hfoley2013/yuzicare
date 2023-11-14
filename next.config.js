/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/actions/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/actions/:path*`,
      },
    ]
  },
};

module.exports = nextConfig;
