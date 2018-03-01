const path = require('path');
const webpack = require('webpack');
const HtmlWebpack = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpack({
      template: './src/index.html',
      chunksSortMode: 'manual',
      chunks: ['vendor', 'main']
    })
  ]
};
