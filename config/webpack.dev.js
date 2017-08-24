const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 9090,
        inline: true,
        historyApiFallback: true
    }
});
