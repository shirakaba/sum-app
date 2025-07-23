// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = [
  __dirname,
  path.resolve(__dirname, '../sum-lib'),
  path.resolve(__dirname, '../runtime-node-api'),
  path.resolve(__dirname, '../runtime-node-api/packages/ios'),
];

module.exports = config;
