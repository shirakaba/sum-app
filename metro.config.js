// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Referenced from:
// https://github.com/facebook/metro/issues/1225
//
// Could alternatively try metro-resolver-symlinks:
// https://github.com/microsoft/rnx-kit/tree/main/packages/metro-resolver-symlinks#readme
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    "react-native-node-api": path.resolve(
      __dirname,
      "../react-native-node-api-modules/packages/host"
    ),
  },
};

config.watchFolders = [
  __dirname,
  path.resolve(__dirname, "../sum-lib"),
  path.resolve(__dirname, "../napi-ios"),
  path.resolve(__dirname, "../napi-ios/packages/ios"),
  path.resolve(__dirname, "../react-native-node-api-modules"),
  path.resolve(__dirname, "../react-native-node-api-modules/packages/host"),
];

module.exports = config;
