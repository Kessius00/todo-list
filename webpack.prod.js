const path = require("path");
const common = require("./webpack.common.js");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// for minimizing, but it doesn't work..
// const TerserPlugin = require("terser-webpack-plugin");
// const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
        ],
    },
    optimization: {
        minimizer: [
            // new OptimizeCssAssetsPlugin(),
            // new CssMinimizerPlugin(),
            // test dit opnieuw, wat gaat er fout? ^^^
            
            // new TerserPlugin(),
            // For webpack@5 you can use the `...` syntax to extend existing minimizers
            '...',
            // new CssMinimizerPlugin(),
            
        ],
    },
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css"}
    ), new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify:{
          // This option removes attribute quotes, which can slightly reduce the size of the HTML file but can also break web pages that depend on attribute quotes for semantic purposes or to handle special characters. It's generally better to avoid using this option and rely on a specific minification tool for HTML files.

          // removeAttributeQuotes: true,  plugins: [new HtmlWebpackPlugin({
          //   template: "./src/template.html"
          // })],
          collapseWhitespace: true,
          removeComments: true,
        }
      })],

});