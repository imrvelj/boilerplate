const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');

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
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        loader: 'worker-loader'
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
