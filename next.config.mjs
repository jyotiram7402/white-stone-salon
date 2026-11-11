/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The sample photos come from Unsplash. Next.js fetches, resizes and caches them on the site's own
    // address, so a visitor's browser never contacts Unsplash. Remove this when every photo is the salon's own.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
