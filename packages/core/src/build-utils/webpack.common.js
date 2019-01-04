const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonPaths = require('./common-paths');

module.exports = {
  entry: commonPaths.appSrc,
  output: {
    filename: 'bundle.js',
    path: commonPaths.appDist,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: commonPaths.index,
    }),
  ],
};
