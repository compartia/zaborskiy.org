/* webpack.config.js */

const devMode = process.env.NODE_ENV !== 'production'


const HtmlWebpackPlugin = require('html-webpack-plugin');

const Clean = require('clean-webpack-plugin');
const path = require('path');

const md = require('./webpack.md.js');


/* Configure BrowserSync */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const BrowserSyncPluginConfig = new BrowserSyncPlugin(
    {
        host: 'localhost',
        port: 9020,
        proxy: 'http://localhost:8080/'
    },
    config = {
        reload: false
    })


module.exports = {

    watchOptions: {
        ignored: ['temp', 'node_modules']
    },

    entry: {
        index: path.resolve(__dirname, 'web/index.html'),
        index: path.resolve(__dirname, 'web/index.ts'),
        japan: path.resolve(__dirname, 'web/gal/japan.ts'),
        cv: path.resolve(__dirname, 'web/gal/cv.ts'),
        pg: path.resolve(__dirname, 'web/externals/pages.js')
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'bower_components'),
            path.resolve(__dirname, 'node_modules'),
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.html']
    },

    mode: devMode ? "development" : "production",
    module: {
        rules: [

            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg|pdf)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'assets/img/[name].[ext]'
                }
            },


            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },


            {
                // If you see a file that ends in .js, just send it to the babel-loader.
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },

            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            pedantic: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(__dirname, 'web/index.html')
        }),




        new HtmlWebpackPlugin({
            inject: false,
            filename: 'artem_zaborskiy_resume.html',
            template: 'web/gal/artem_zaborskiy_resume.html'
        }),


        md.page1,
        md.page2,
        BrowserSyncPluginConfig,

        new Clean(['dist']),
    ],


};
