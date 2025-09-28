const { getDefaultConfig } = require("@expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname, {
	getDefaultConfig: (projectRoot, options) => {
		const defaultConfig = getDefaultConfig(projectRoot, options);
		const { transformer, resolver } = defaultConfig;

		// Configure react-native-svg-transformer
		return {
			...defaultConfig,
			transformer: {
				...transformer,
				babelTransformerPath: require.resolve(
					"react-native-svg-transformer/expo"
				),
			},
			resolver: {
				...resolver,
				assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
				sourceExts: [...resolver.sourceExts, "svg"],
			},
		};
	},
	// Other Sentry Expo configuration options can be added here, e.g., annotateReactComponents: true
});

module.exports = config;
