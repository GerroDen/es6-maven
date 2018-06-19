const path = require("path");
const resources = "./src/main/resources";

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
