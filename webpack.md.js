const HtmlWebpackPlugin = require('html-webpack-plugin');

var page1 = new HtmlWebpackPlugin({
    minify: true,
    inject: false,
    filename: 'recipe.html',
    template: 'web/externals/recipe.html'
})

var page2 = new HtmlWebpackPlugin({
    minify: true,
    inject: false,
    filename: 'zeitsinnism.html',
    template: 'web/externals/zeitsinnism.html'
})

module.exports = {
    page1,
    page2
}