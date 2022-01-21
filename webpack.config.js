const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "mitsit.min.js",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ["style-loader","css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
  })],
  devServer: {
    port: 9000,
    open: true
  }
};
