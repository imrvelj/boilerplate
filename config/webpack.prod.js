const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');

const CleanWebpack = require('clean-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const extractStyles = new ExtractText({ filename: 'styles.css' });

module.exports = merge(base, {
    entry: {
        app: './src/main.js',
        vendor: './src/vendor.js'
    },
    output: {
        chunkFilename: '[chunkhash].[name].js',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractStyles.extract(
                    {
                        use: [
                            'css-loader?importLoaders=1',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions', 'safari 8'] })]
                                }
                            },
                            'sass-loader'
                        ],
                        fallback: 'style-loader'
                    }
                )
            },
        ]
    },
    plugins: [
        new CleanWebpack(['dist'], { root: path.resolve(__dirname, '..')}),
        extractStyles,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false,
            },
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            comments: false
        })
    ]

});