/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // experimental: {
  //   outputStandalone: true,
  //   workerThreads: false,
  //   cpus: 1,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.ustw.watch",
        port: "",
        pathname: "/public-image/**",
      },
    ],
  },
  i18n: {
    locales: ["default", "en", "zh", "zh-TW"],
    defaultLocale: "default",
    localeDetection: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "type-graphql": path.join(
        __dirname,
        "src/hacks/type-grqphql-hack/mock-module.js"
      ),
    };

    return config;
  },
};
