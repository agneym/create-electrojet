const webpack = require('webpack')
const packager = require('electron-packager')
const ora = require("ora")

const { getPackagerConfig, getConfig, getWebpackConfig } = require('../extensions/getConfig')

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets electron on watch
 * @param {Object} cli
 */
async function build (cli) {
  const env = 'prod'

  const config = await getConfig()
  
  const webpackConfig = getWebpackConfig(env, config.plugins)
  const compiler = webpack(webpackConfig)

  compiler.run(async (err, stats) => {
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
      return
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    const spinner = ora("Starting to generate build").start()

    try {
      const config = await getPackagerConfig(config.buildOptions)

      const appPaths = await packager(config)
      spinner.succeed(`Generated builds successfully at
        ${appPaths.join('\n')}
      `);
    } catch(error) {
      spinner.fail(`Could not generate build :(
        ${error}  
      `)
    }
  })
}

module.exports = build
