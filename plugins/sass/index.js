const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => env === "dev" ? ({
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
}) : ({
  module: {
    loaders: [
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  }
})