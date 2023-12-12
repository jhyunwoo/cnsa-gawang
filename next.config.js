/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "k.kakaocdn.net",
      },
    ],
  },
};

module.exports = nextConfig;
