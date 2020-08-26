const withOffline = require('next-offline');

const nextConfig = {
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    maximumFileSizeToCacheInBytes: 100000000,
    runtimeCaching: [
      {
        urlPattern: /https:\/\/images2\.imgbox\.com\/.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /https:\/\/api\.spaceXdata\.com\/v3\/launches?limit=100/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'data',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 24 * 60 * 60, // 1 day
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }
    ],
  },
};

module.exports = withOffline(nextConfig);