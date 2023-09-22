/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["jisilver-bucket.s3.ap-northeast-2.amazonaws.com"],
  // },
};
module.exports = {
  externals: {
    "utf-8-validate": "utf-8-validate",
    bufferutil: "bufferutil",
    canvas: "commonjs canvas",
  },
  module: {
    rules: [
      {
        test: /canvas\.node$/,
        use: "file-loader",
      },
    ],
  },
};

module.exports = nextConfig;
