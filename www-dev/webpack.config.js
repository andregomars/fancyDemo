var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/hams/public');
var APP_DIR = path.resolve(__dirname, 'src/hams/components');

var config = {
  entry: {
    awesome : APP_DIR + '/AwesomeComponent.jsx',
    cards : APP_DIR + '/Cards.jsx',
    datatable : APP_DIR + '/DataTable.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-bundle.js'
  },
  plugins: [
	new webpack.DefinePlugin({
	  'process.env': {
	    NODE_ENV: JSON.stringify('production')
	  }
	}),
	new webpack.optimize.UglifyJsPlugin()
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
