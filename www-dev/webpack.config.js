var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/hams/js');
var APP_DIR = path.resolve(__dirname, 'src/hams/components');

var config = {
  entry: {
    awesome : APP_DIR + '/AwesomeComponent.jsx',
    cards : APP_DIR + '/Cards.jsx',
    table : APP_DIR + '/Table.jsx',
    materialdemo : APP_DIR + '/MaterialDemo.jsx'
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/assets/',
    filename: '[name]-bundle.js'
  },
  // watch: true,
  plugins: [
	new webpack.DefinePlugin({
	  'process.env': {
	    NODE_ENV: JSON.stringify('production')
	  }
	}),
	// new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
