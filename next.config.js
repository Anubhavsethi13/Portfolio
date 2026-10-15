/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // next/image is not used anywhere in the app. Disabling the optimizer makes the
    // self-hosted /_next/image endpoint return 404, which removes the attack surface of
    // the image-optimizer advisories that have no fix in the Next.js 14.x line.
    unoptimized: true,
  },
}

module.exports = nextConfig
