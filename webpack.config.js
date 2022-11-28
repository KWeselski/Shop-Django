const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, './frontend/static/frontend'),
    filename: '[name].js',
    publicPath: './frontend/static'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [new Dotenv()]
};
