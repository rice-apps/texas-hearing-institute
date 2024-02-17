// eslint-disable-next-line no-undef
module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
		plugins: [
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env.local',
					safe: true,
					allowUndefined: false,
				},
			],
			['@babel/plugin-transform-private-methods', { loose: true }],
			['@babel/plugin-transform-class-properties', { loose: true }],
		],
	};
};
