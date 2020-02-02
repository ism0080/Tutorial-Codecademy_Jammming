const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Root Path
 * @desc Constructs a valid path from the current project directory
 * @param args Path components
 * @returns Valid concatenated path
 */
const rootPath = (...args) => args.reduce((fullPath, pathComponent) => path.join(fullPath, pathComponent), __dirname)

/**
 * HTML Webpack Plugin
 * @desc Configuration for building the HTML page
 * @note Some props are injected and some are configuration (rendering) settings
 */
const htmlPlugin = new HtmlWebPackPlugin({
  title: 'Jamming',
  template: rootPath('assets', 'index.html'),
  filename: 'index.html',
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
})

const hotModulePlugin = new webpack.HotModuleReplacementPlugin()

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
})

/**
 * Webpack Configuration
 */
module.exports = {
  entry: ['webpack/hot/dev-server', rootPath('src', 'index.tsx')],
  target: 'web',
  output: {
    path: rootPath('dist'),
    publicPath: './',
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localsConvention: 'camelCaseOnly',
              modules: {
                localIdentName: '[name]-[local]-[hash:base64:8]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [miniCssExtractPlugin, htmlPlugin, hotModulePlugin],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
  },
  devServer: {
    publicPath: 'http://localhost:8000',
    contentBase: rootPath('assets'),
    open: false,
    lazy: false,
    compress: true,
    historyApiFallback: true,
    port: 3000,
  },
}
