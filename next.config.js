/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["jisilver-bucket.s3.ap-northeast-2.amazonaws.com"],
  // },
};
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "file-loader",
      },
    ],
  },
};

module.exports = nextConfig;
