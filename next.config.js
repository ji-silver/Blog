/** @type {import('next').NextConfig} */
const nextConfig = {
  resolve: {
    alias: {
      canvas: false,
    },
  },
  externals: {
    "utf-8-validate": "utf-8-validate",
    bufferutil: "bufferutil",
  },
};

module.exports = nextConfig;
