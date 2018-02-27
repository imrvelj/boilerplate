const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');

const CleanWebpack = require('clean-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const extractStyles = new ExtractText({
  filename: 'styles.css'
});
const extractVendor = new ExtractText({
  filename: 'vendor.css'
});

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: extractVendor.extract({
        use: [
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer')({
                browsers: ['last 2 versions', 'safari 8']
              })]
            }
          }
        ],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.scss$/,
      use: extractStyles.extract({
        use: [
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer')({
                browsers: ['last 2 versions', 'safari 8']
              })]
            }
          },
          'sass-loader'
        ],
        fallback: 'style-loader'
      })
    }
    ]
  },
  plugins: [
    new CleanWebpack(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    extractStyles
  ]

});
