const withCSS = require('@zeit/next-css')
const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
// To add new modules, nest the function (like a HOC in React)
module.exports = withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })
    // Here is the magic
    // We push our config into the resolve.modules array
    // Relative Paths
    config.resolve.modules.push(path.resolve('./src'))
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  },
})
