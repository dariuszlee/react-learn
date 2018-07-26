var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/startapp.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module : {
		rules : [
			{
				use : 'babel-loader',
				test : /\.js?/,
				include : APP_DIR
			}
		]
	}
};

module.exports = config;
