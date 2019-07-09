const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');

module.exports = function () {
  return {
    entry: {
      backend: path.resolve(__dirname, './backend.js'),
      container: path.resolve(__dirname, './container.js')
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: '[name].js',
      publicPath: 'http://0.0.0.0:8080/',
    },
    plugins: [
      new OpenBrowserPlugin({ url: 'http://localhost:8080/shells/plain/index.html' })
    ],
    target: 'web'
  };
}
