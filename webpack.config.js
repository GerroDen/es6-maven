const path = require("path");
const WrmPlugin = require("atlassian-webresource-webpack-plugin");
const resources = "src/main/resources";

const components = ["es6-example.js"]
	.reduce((acc, filename) => {
		acc[filename] = filename;
		return acc;
	}, {});

module.exports = {
	mode: "development",
	context: path.resolve(resources),
	entry: components,
	output: {
		path: path.resolve(__dirname, "target/classes"),
		filename: "[name].bundle.js",
		libraryTarget: "window"
	},
	plugins: [
		new WrmPlugin({
			pluginKey: 'de.wi.lkimmel.es6-maven',
			amdProvider: "confluence.web.resources:almond",
			xmlDescriptors: path.resolve(__dirname, "target/classes", 'META-INF', 'plugin-descriptors', 'wr-defs.xml')
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
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
