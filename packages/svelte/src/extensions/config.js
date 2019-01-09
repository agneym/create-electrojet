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
    }
  }),
};
