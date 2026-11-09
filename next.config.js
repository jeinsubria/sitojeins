/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // La vecchia pagina Blog è stata sostituita dalla pagina Network
  async redirects() {
    return [
      { source: '/blog', destination: '/network', statusCode: 301 },
      { source: '/blog/:path*', destination: '/network', statusCode: 301 },
    ]
  },
}

module.exports = nextConfig
