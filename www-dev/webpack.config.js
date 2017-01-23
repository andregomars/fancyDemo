var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/hams/js');
var APP_DIR = path.resolve(__dirname, 'src/hams/components');

var config = {
  entry: {
    // awesome : APP_DIR + '/AwesomeComponent.jsx',
    // cards : APP_DIR + '/Cards.jsx',
    // table : APP_DIR + '/TableSimple.jsx',
    toggleview : APP_DIR + '/ToggleView.jsx',
    // materialdemo : APP_DIR + '/MaterialDemo.jsx'
    // vehicleprogress : APP_DIR + '/VehicleProgress.jsx',
    // vehiclegauge : APP_DIR + '/VehicleGauge.jsx',
    vehicle : APP_DIR + '/Vehicle.jsx'
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/assets/',
    filename: '[name]-bundle.js'
  },
  // resolve: {
  //   extensions: ['','.js', '.jsx']
  // },
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
