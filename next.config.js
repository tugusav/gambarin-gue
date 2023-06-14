/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["devnote.tech", "cdn-icons-png.flaticon.com", "bit.ly", "gambaringue-images160132-main.s3.ap-southeast-1.amazonaws.com"],
  }
}

module.exports = nextConfig
