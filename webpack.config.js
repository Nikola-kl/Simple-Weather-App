const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
  },
  mode: "production",
  // devTools: 'source-maps',
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "stream": require.resolve("stream-browserify")
    },
  },
  module: {
    rules: [
      { test: /\.js?$/, loader: "babel-loader", exclude: /node_modules/ },
      // { test: /\.png?$/, use: [
      //     {
      //         loader: 'url-loader',
      //         options: {
      //             mimetype: 'image/png',
      //         }
      //     }
      // ]},
      {
        test: /\.css?$/,
        use: [
          {
            loader: "style-loader",
          },
          { loader: "css-loader" },
        ],
      },
      // { test: /\.s(a|c)ss?$/, loader: ['style-loader', 'css-loader', 'sass-loader']}
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    hot: true,
    open: true,
    port: 8000,
    // watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/style.css",
          to: "style.css",
        },
      ],
    }),
    new CopyPlugin({
        patterns: [
          {
            from: "Img",
            to: "Img",
          },
        ],
      }),
    new CopyPlugin({
        patterns: [
            {
            from: "videos",
            to: "videos",
            },
        ],
    }),
    new Dotenv({
      path: "./.env"
    }),
  ],
};
