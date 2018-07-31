/* webpack.config.js */

const devMode = process.env.NODE_ENV !== 'production'


const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const path = require('path');
const setupServerMockup = require('./demo/serverMockup');


/* Configure BrowserSync */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const BrowserSyncPluginConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 9020,
    proxy: 'http://localhost:8080/'
}, config = {
    reload: false
})


module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: {
        // index: path.resolve(__dirname, 'web/index.html'),
        index: path.resolve(__dirname, 'web/index.ts'),
        japan: path.resolve(__dirname, 'web/gal/japan.ts'),
    },
    
    resolve: {
        modules: [
            path.resolve(__dirname, 'bower_components'),
            path.resolve(__dirname, 'node_modules'),

        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.html']
    },
    // These rules tell Webpack how to process different module types.cd ..
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.

    mode: "development",
    module: {
        rules: [
            // { // css / sass / scss loader for webpack
            //     test: /\.(css|sass|scss)$/,
            //     use: ExtractTextPlugin.extract({
            //       use: ['css-loader', 'sass-loader'],
            //     })
            // },

            { 
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader' ,
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'assets/img/[name].[ext]'
                } 
            },
        

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.html$/,
                loader: 'html-loader' 
              },
       

            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            //   },
            {
                // If you see a file that ends in .js, just send it to the babel-loader.
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ]
    },
    plugins: [
        // This plugin will generate an index.html file for us that can be used
        // by the Webpack dev server. We can give it a template file (written in EJS)
        // and it will handle injecting our bundle for us.
       
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(__dirname, 'web/index.html')
        }),

        new HtmlWebpackPlugin({ 
            minify:true,
            inject: true,
            filename: 'japan.html',
            template: 'web/gal/japan.html'
        }),

        new HtmlWebpackPlugin({ 
            minify:true,
            inject: true,
            filename: 'secret_lab.html',
            template: 'web/gal/secret_lab.html'
        }),

        // This plugin will copy files over to ‘./dist’ without transforming them.
        // That's important because the custom-elements-es5-adapter.js MUST
        // remain in ES2015. We’ll talk about this a bit later :)
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
            to: 'bower_components/webcomponentsjs/[name].[ext]'
        }]),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        
        BrowserSyncPluginConfig,

        new Clean(['dist']),
    ],

    // devServer: {
    //     contentBase: path.join(__dirname),
    //     compress: true,
    //     overlay: true,
    //     port: 9020,
    //     setup: setupServerMockup,
    // },
};
