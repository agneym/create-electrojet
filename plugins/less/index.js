const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, context, options) => env === "dev" ? ({
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: options,
          }
        ]
      },
    ]
  }
}) : ({
  module: {
    loaders: [
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: options,
          },
        ]
      }
    ]
  }
})