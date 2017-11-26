const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./main.js'],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  devServer: {
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'web search',
      filename: path.join(__dirname, 'www', 'index.html'),
      template: 'index.html'
    })]
};
