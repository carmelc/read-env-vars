const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');

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
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.plugins.push(new StylableWebpackPlugin());
    config.module.rules.push({
      test: /\.css$/i,
      exclude: /\.st\.css?/, /* exclude stylable files */
      use: ["css-loader"],
    });
    return config
  },
};

module.exports = nextConfig;
