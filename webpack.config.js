const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CheckerPlugin(),
    // new CleanWebpackPlugin(['dist']),
    // new UglifyJSPlugin({
    //   sourceMap: true,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
};
