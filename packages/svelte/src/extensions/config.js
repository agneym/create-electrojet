const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  default: {
    plugins: [],
  },
  webpack: (env, context) => [
    {
      devServer: {
        open: true,
      },
      resolve: {
        mainFields: ["svelte", "browser", "module", "main"],
      },
      module: {
        rules: [
          {
            test: /\.(html|svelte)$/,
            exclude: /node_modules/,
            use: {
              loader: "svelte-loader",
              options: {
                emitCss: true,
                hotReload: env === "dev",
              },
            },
          },
        ],
      },
      plugins: [
        ...context.plugins.slice(1),
        new HtmlWebpackPlugin({
          template: path.resolve(process.cwd(), "src/index.ejs"), // This wouldn't work on a normal HTML file
        }),
      ],
    },
    {
      plugins: "replace",
    },
  ],
};
