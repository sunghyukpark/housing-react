const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	devtool: 'eval-source-map',
  entry: [
  	'webpack-dev-server/client?http://localhost:3000',
  	'webpack/hot/only-dev-server',
  	'react-hot-loader/patch',
  	path.join(_dirname, 'app/index.js')
  ],
  output: {
    path: path.join(_dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { 
      	test: /\.js?$/, 
      	loader: 'babel-loader', 
      	exclude: /node_modules/ 
      },
      { 
      	test: /\.jsx/, 
      	loader: 'babel-loader', 
      	exclude: /node_modules/ 
      },
      { 
      	test: /\.json?$/, 
      	loader: 'json' 
      },
      { 
      	test: /\.scss$/, 
      	loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }, 
      { 
      	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      	loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      { 
      	test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      	loader: "file-loader" 
      }
    ]
  },
  plugins: [
    // Simplifies creating of html files to serve webpack bundles
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html', // filename refers to name of HTML that the plugin will generate
      inject: 'body' // add javascript before closing 'body' tag
    }), 

    // Assign shorter id's to more recurring modules
    new webpack.optimize.OccurenceOrderPlugin(),

    // Instant change in browser
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    // Pass variables from webpack to js files. 
    //  - for ex, tell what env we are in. 
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
