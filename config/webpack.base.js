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
        filename: '[name].js',
        chunkFilename: '[id].[name].js'
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
        new webpack.LoaderOptionsPlugin({
            minimize: isProd,
            debug: !isProd
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: module => /node_modules/.test(module.resource)
        }),
        new HtmlWebpack({
            template: './src/index.html',
            chunks: [
                'runtime',
                'vendor',
                'main'
            ],
            chunksSortMode: 'manual'
        })
    ]
};
