/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nest-real-estate-platform',

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig