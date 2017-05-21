/**
 * Created by Administrator on 2016/8/3.
 */
var path = require('path')
    , webpack = require('webpack')
    , argv = require('yargs').argv
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , CopyWebpackPlugin = require('copy-webpack-plugin')
    , plugins = [];
var config = argv.conf || "development";
require('es6-promise').polyfill();

argv.p && plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
}));

plugins.push(new HtmlWebpackPlugin({
    template: './index.html',
    hash: true,
    inject: 'body'
}));

plugins.push(new CopyWebpackPlugin([
    {from: 'frontend/config', to: 'config'},
    {from: 'frontend/assets', to: 'assets'}
]));

module.exports = {
    entry: {
        main: [path.join(__dirname, 'frontend/entry.js')]
    },
    output: {
        devtool: 'source-map',
        path: path.join(__dirname, 'build/'),    //打包存放的绝对路径
        publicPath: "/",         //网站运行时的房屋路径
        filename: '[name].js',          //打包后的文件名
        sourceMapFilename: '[file].map'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.jsx?$/,
            loader: 'jsx-loader?harmony'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[1-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader?name=fonts/[hash].[ext]"
        }, {
            test: /\.(png|jpg)$/,
            loader: "url-loader?limit=8192&name=imgs/[hash].[ext]"
        },{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        }]
    },
    plugins: plugins,
    watch: true
};