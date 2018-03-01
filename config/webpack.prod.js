const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');

const CleanWebpack = require('clean-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const autoprefixer = require('autoprefixer')({
  browsers: ['last 2 versions', 'safari 8']
});

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpack(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new ExtractText('styles.css')
  ]
});
