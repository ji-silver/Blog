/** @type {import('next').NextConfig} */
const nextConfig = {
  resolve: {
    alias: {
      canvas: false,
    },
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
      "ssl.pstatic.net",
    ],
  },
  externals: {
    "utf-8-validate": "utf-8-validate",
    bufferutil: "bufferutil",
  },
};

module.exports = nextConfig;
