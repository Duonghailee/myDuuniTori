const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./entrypoint.js'],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets : ['react']
          } 
        }
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
    port: 9000,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'web search',
      filename: path.join(__dirname, 'src', 'index.html'),
      template: 'index.html'
    })]
};
