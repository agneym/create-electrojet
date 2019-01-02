const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const {getConfig, getWebpackConfig} = require('../extensions/getConfig')
const getPort = require('../extensions/getPort')

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server on watch
 * @param {object} options
 * @returns {Promise}
 */
async function start (options = {}) {
  const env = 'dev'
  const userPort = options.flags.port

  const port = await getPort(userPort)

  const config = await getConfig()

  const webpackConfig = getWebpackConfig(env, options.plugins, config.plugins)
  const compiler = webpack(webpackConfig)

  const server = new WebpackDevServer(compiler, {
    contentBase: process.cwd(),
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'none'
  })

  return new Promise(resolve => {
    server.listen(port, 'localhost', (err) => {
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
        throw new Error(err)
      }

      return resolve()
    })
  })
}

module.exports = start
