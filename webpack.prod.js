const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: [
        './public/javascripts/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'javascripts/bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new CopyPlugin([
            { from: 'public' }
        ])
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react', { 'plugins': ['@babel/plugin-proposal-class-properties'] }]
                    }
                }]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    }
}