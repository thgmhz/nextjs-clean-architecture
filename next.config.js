const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.testeAPI = path.join(__dirname, 'teste')
    config.resolve.alias.nextAPI = path.join(__dirname, 'pages', 'api')
    return config
  },
}

module.exports = nextConfig
