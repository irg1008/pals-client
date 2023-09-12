const nextIntl = require('next-intl/plugin')
const nextIntlConfig = nextIntl('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  }
}

module.exports = nextIntlConfig(nextConfig)
