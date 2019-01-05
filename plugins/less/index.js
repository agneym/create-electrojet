const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => env === "dev" ? ({
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
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
          'less-loader',
        ]
      }
    ]
  }
})