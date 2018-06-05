import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Gen external css with hash filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    //Hash files to change names on content change
    new WebpackMd5Hash(),
    //CommonsChunkPlugin to create separate bundle for vendor libraries
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    //Create HTML file with ref to bundles js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),
    //Eliminate duplicate package when bundling
    new webpack.optimize.DedupePlugin()

  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
