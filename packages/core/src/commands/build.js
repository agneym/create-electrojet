const webpack = require('webpack')

const { getConfig, getWebpackConfig } = require('../extensions/getConfig')

/**
 * Triggered when start command is run from the CLI
 * Triggers a webpack build into the dist folder
 * @param {Object} options
 * @returns {Promise}
 */
async function build (options = {}) {
  const env = 'prod'

  const config = await getConfig()
  
  const webpackConfig = getWebpackConfig(env, options.plugins, config.plugins)
  const compiler = webpack(webpackConfig)

  return new Promise(resolve => {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
        return
      }

      const info = stats.toJson()

      if (stats.hasErrors()) {
        console.error(info.errors)
        throw new Error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }

      return resolve();
    });
  })
}

module.exports = build
