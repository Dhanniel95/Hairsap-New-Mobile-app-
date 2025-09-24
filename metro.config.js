const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Wrap Expo config with Sentry
const config = getSentryExpoConfig(__dirname, defaultConfig);

// Apply your SVG transformer config
config.resolver.assetExts = config.resolver.assetExts.filter(
	(ext) => ext !== "svg"
);
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

config.transformer = {
	...config.transformer,
	babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

module.exports = config;
