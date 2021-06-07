const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // mode: "development",
  mode: "production",
  entry: { en: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },

  devServer: {
    index: "index_en.html",
    compress: true,
    inline: true,
    contentBase: "./dist",
    publicPath: "/",
    hot: true,
  },

  devtool: false,

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "GCWeb"),
          to: path.resolve(__dirname, "dist", "GCWeb"),
        },
        {
          from: path.resolve(__dirname, "src", "wet-boew"),
          to: path.resolve(__dirname, "dist", "wet-boew"),
        },
        {
          from: path.resolve(__dirname, "src", "main.css"),
          to: path.resolve(__dirname, "dist", "main.css"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `index_en.html`,
      chunks: [`en`],
      chunksSortMode: "auto",
      template: "src/index.html",
    }),

    // uncomment these lines below for easier browser debugging in development mode
    // new webpack.SourceMapDevToolPlugin({
    //   filename: "dist/[file].map",
    //   fileContext: "public",
    // }),
    // new BundleAnalyzerPlugin(),
  ],

  resolve: {
    extensions: ["*", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    usedExports: true,
  },
};
