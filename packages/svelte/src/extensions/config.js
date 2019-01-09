module.exports = {
  default: {
    plugins: [],
  },
  webpack: (env) => ({
    devServer: {
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              skipIntroByDefault: true,
              nestedTransitions: true,
              emitCss: true,
              hotReload: env === "prod" ? false : true,
            }
          }
        },
      ]
    }
  }),
};
