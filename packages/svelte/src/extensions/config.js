const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  default: {
    plugins: [],
  },
  webpack: (env) => ({
    devServer: {
      open: true,
    },
    resolve: {
      mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
      rules: [
        {
          test: /\.(html|svelte)$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              skipIntroByDefault: true,
              nestedTransitions: true,
              emitCss: true,
              hotReload: false,
            }
          }
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), 'src/index.ejs'), // This wouldn't work on a normal HTML file
        inject: true,
      }),
    ]
  }),
};
