/**
 * @file config enx-build
 * @author luwenlong
 */

var path = require('path');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var port = 3000;
var exclude = [
    '.git',
    '*.bak',
    '*.swp',
    '*.swo',
    '.gitignore',
    'node_modules'
];

module.exports = {
    devtool: 'eval',
    entry: {
        index: [
            'webpack-dev-server/client?http://127.0.0.1:' + port,
            'webpack/hot/only-dev-server',
            './src/index/main.js'
        ],
        search: [
            './src/search/main.js'
        ],
        common: ['react']
    },
    output: {
        path: path.join(__dirname, 'asset'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/asset/', 
        library: '[name]',
        libraryTarget: 'amd'
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!stylus-loader')
            },
            {
                test: /\.(js|jsx)?$/,
                loaders: ['react-hot', 'babel?stage=0&optional=runtime'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(eot|woff|ttf|svg)$/,
                loader: 'file-loader?limit=81920'
            },
        ]
    },
    resolve: {
        root: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].[hash].css'),
        new HtmlWebpackPlugin({
            filename: 'entry/index.html',
            hash: true,
            template: 'tpl/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'entry/search.html',
            hash: true,
            template: 'tpl/search.html',
        })
    ],
    port: port,
    exclude: exclude,
    documentRoot: __dirname,
};
