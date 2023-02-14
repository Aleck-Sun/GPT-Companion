const path = require('path');
const ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  devtool: "eval-cheap-source-map",
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "commonjs",
  },
  externals: ["aws-sdk"],
  plugins: [
    new ZipPlugin({
      include: ["index.js"],
    }),
  ],
};