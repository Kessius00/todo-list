const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },
            {
                test: /\.(jpg|gif|svg|png)$/i,
                type: "asset/resource",
                generator: {
                    filename: "imgs/[name].[hash].[ext]",
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],

}