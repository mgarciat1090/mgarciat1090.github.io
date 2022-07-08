const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {

	entry: path.join(__dirname, 'src','index.jsx'),

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'main.bundle.js',
	},

	mode: process.env.NODE_ENV || 'development',

	resolve: {
		extensions: ['.js','json', 'jsx', 'scss'],
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
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
		        test: /\.s[ac]ss|css$/i,
		        use: [
		          // Creates `style` nodes from JS strings
		          "style-loader",
		          // Translates CSS into CommonJS
		          "css-loader",
		          // Compiles Sass to CSS
		          "sass-loader",
		          "postcss-loader"
		        ],
		      },
		],
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      template: 'src/index.html'
	    }),
	    new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets' }
            ]
        })
	],

};