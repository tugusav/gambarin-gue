/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["devnote.tech", "cdn-icons-png.flaticon.com", "bit.ly", "gambaringue-generated-images.s3.ap-southeast-1.amazonaws.com", "gg-generated.s3.us-east-1.amazonaws.com"],
  }
}

module.exports = nextConfig
