const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {MiniCssExtractPlugin} = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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

        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(), new TerserPlugin()
        ]
    },
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css"}), new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify:{
          removeAttributeQuotes: true,  plugins: [new HtmlWebpackPlugin({
            template: "./src/template.html"
          })],
          collapseWhitespace: true,
          removeComments: true
        }
      })],

});