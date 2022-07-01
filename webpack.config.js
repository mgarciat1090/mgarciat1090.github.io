const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {

	entry: path.join(__dirname, 'src','index.jsx'),

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'main.bundle.js'
	},

	mode: process.env.NODE_ENV || 'development',

	resolve: {
		extensions: ['.js','json', 'jsx'],
		modules: [path.resolve(__dirname,'src'),'node_modules']
	},

	devServer: {
		static: path.join(__dirname,'src'),
		port: 3500,
		watchFiles: "true",
		open: true
	},


	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		],
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      template: 'src/index.html'
	    })
	],

};