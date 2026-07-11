/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/backrooms', destination: '/cumroom', permanent: true },
      { source: '/backrooms/:slug*', destination: '/cumroom/:slug*', permanent: true },
    ]
  },
}

module.exports = nextConfig
