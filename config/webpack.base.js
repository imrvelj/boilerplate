const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist')
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
            template: './src/index.html'
        })
    ]
};
