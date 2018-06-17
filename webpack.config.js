const path = require('path');
const resources = path.resolve(__dirname, "src/main/resources");

module.exports = {
	mode: "development",
	entry: [
		path.resolve(resources, "es6-example.js")
	],
	output: {
		path: path.resolve(__dirname, "target/generated-resources"),
		filename: "[name].js",
		libraryTarget: "window"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			}
		]
	},
	resolve: {
		modules: [
			resources,
			'node_modules'
		]
	},
	cache: true
};
