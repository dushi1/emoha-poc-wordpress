module.exports = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "emoha.com",
      },
    ],
  },
  assetPrefix: "./",
  output: "export",
  staticPageGenerationTimeout: 1000,
};
