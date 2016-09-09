var PROD = process.argv.indexOf('-p') >= 0;
var webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 要加两个插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageInfo = require('./package.json');

const outputPath = __dirname + '/dist/';

const minifiyConfig = {
	removeComments: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	collapseBooleanAttributes: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true
};

var webpackConfig = {
	entry: {
		index: "./index.js",
		detail: "./detail.js",
		notes:"./notes.js"
	},
	output: {
		path: outputPath, // 输出到版本号目录
		filename: PROD ? '[name]-[hash].min.js' : '[name]-[hash].js'
	},
	module: {
		loaders: [{
			test: /\.(png|jpg|jpeg|gif|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
			loader: 'file'
		}, {
			test: /\.css$/,
			//loader: "style!css?modules!postcss"
			loader: ExtractTextPlugin.extract('style', 'css')
		}, {
			test: /\.json$/,
			loader: "json-loader"
		}/*,{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader?presets[]=es2015'
		}*/]
	},
	postcss: [
		require('autoprefixer')
	],
	plugins: [
		new ExtractTextPlugin(PROD ? '[name]-[hash].min.css' : '[name]-[hash].css'),
		new webpack.BannerPlugin('This file is created by realeve'),
		new webpack.optimize.OccurenceOrderPlugin(),
		//new webpack.optimize.CommonsChunkPlugin('common.min.js'),
		new webpack.optimize.UglifyJsPlugin()
	],
	externals: {
		jquery: 'window.$'
	}
};

for (var key in webpackConfig.entry) {
	const tplPath = './tpl/';
	var plugin = new HtmlWebpackPlugin({
		title: packageInfo.description,
		minify: minifiyConfig,
		template: tplPath+key + '.html',
		filename: key + '.html',
		chunks: [key],
		hash: false
	});
	webpackConfig.plugins.push(plugin);
}

module.exports = webpackConfig;