const WebpackBar = require('webpackbar')

module.exports = {
  mode: 'development',
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    clientLogLevel: 'none'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /.jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /(node_modules|dist|build-utils|webpack.config.js)/
      }
    ]
  },
  plugins: [
    new WebpackBar()
  ]
}
