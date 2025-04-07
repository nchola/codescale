/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Esto permite que la compilación continúe incluso si hay errores de ESLint
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

