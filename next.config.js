const { decorateNextJsWebpackConfig } = require("wix-style-react/setup");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/wix-api/site-list/v2/sites/query',
        destination:
          'https://www.wixapis.com/site-list/v2/sites/query',
      }
    ];
  },
  env: {},
  webpack: ( config, options) => {
    return decorateNextJsWebpackConfig(config, options);
  },
};

module.exports = nextConfig;
