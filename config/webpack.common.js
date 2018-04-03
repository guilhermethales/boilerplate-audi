const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './src/index.js',
    style: './src/assets/scss/index.scss',
  },
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [path.resolve(__dirname, '../node_modules/babel-preset-env')]
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
};