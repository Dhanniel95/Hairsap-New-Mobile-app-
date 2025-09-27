// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

function createConfig() {
	// 1. Get Expo's default config
	const defaultConfig = getDefaultConfig(__dirname);

	// 2. Extend it with your changes
	const extendedConfig = {
		...defaultConfig,
		resolver: {
			...defaultConfig.resolver,
			assetExts: defaultConfig.resolver.assetExts.filter(
				(ext) => ext !== "svg"
			),
			sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
		},
		transformer: {
			...defaultConfig.transformer,
			babelTransformerPath: require.resolve(
				"react-native-svg-transformer"
			),
		},
	};

	// 3. Wrap with Sentry AFTER extending Expo config
	return getSentryExpoConfig(__dirname, extendedConfig);
}

module.exports = createConfig();
