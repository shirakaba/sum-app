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
  path.resolve(__dirname, "./node_modules"),
  path.resolve(__dirname, "../sum-lib"),
  path.resolve(__dirname, "../napi-ios"),
  path.resolve(__dirname, "../napi-ios/packages/ios"),
  path.resolve(__dirname, "../react-native-node-api-modules"),
  path.resolve(__dirname, "../react-native-node-api-modules/packages/host"),
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === "macos" &&
    (moduleName === "react-native" || moduleName.startsWith("react-native/"))
  ) {
    const newModuleName = moduleName.replace(
      "react-native",
      "react-native-macos"
    );
    return context.resolveRequest(context, newModuleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
  },
});

const originalGetModulesRunBeforeMainModule =
  config.serializer.getModulesRunBeforeMainModule;
config.serializer.getModulesRunBeforeMainModule = () => {
  try {
    return [
      require.resolve("react-native/Libraries/Core/InitializeCore"),
      require.resolve("react-native-macos/Libraries/Core/InitializeCore"),
    ];
  } catch {}
  return originalGetModulesRunBeforeMainModule();
};

module.exports = config;
