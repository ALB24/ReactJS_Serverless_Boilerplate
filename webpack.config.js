const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'none',
	entry: './client/src/index.js',
	output: {
		path: path.join(__dirname, '/client/dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.wav$/,
				loader: "file-loader"
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
					limit: 8000, // Convert images < 8kb to base64 strings
					name: 'img/[hash]-[name].[ext]',
					},
				}],
			},
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./client/src/index.html'
		})
	],
	resolve: {
		extensions: ["*", ".js", ".jsx"]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}
	// watch: true
};