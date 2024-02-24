// eslint-disable-next-line no-undef
module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
		plugins: [
			[
			  'module:react-native-dotenv',
			  {
				envName: 'APP_ENV',
				moduleName: '@env',
				path: '.env.local',
				blocklist: null,
				allowlist: null,
				blacklist: null, // DEPRECATED
				whitelist: null, // DEPRECATED
				safe: false,
				allowUndefined: true,
				verbose: false,
			  },
			],
			['@babel/plugin-transform-private-methods', { loose: true }],
			['@babel/plugin-transform-class-properties', { loose: true }],
		],
	};
};
