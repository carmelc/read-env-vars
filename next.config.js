const { decorateNextJsWebpackConfig } = require("wix-style-react/setup");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/wix-api/site-list/v2/sites/query',
        destination:
          'https://www.wixapis.com/site-list/v2/sites/query',
      },
      {
        source: '/wix-api/form-schema-service/v4/forms',
        destination:
            'https://www.wixapis.com/form-schema-service/v4/forms',
      }
    ];
  },
  env: {},
  webpack: ( config, options) => {
    return decorateNextJsWebpackConfig(config, options);
  },
};

module.exports = nextConfig;
