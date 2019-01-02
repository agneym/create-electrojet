const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const spawn = require('cross-spawn')

const {getConfig, getWebpackConfig} = require('../extensions/getConfig')
const getPort = require('../extensions/getPort')

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets electron on watch
 * @param {object} cli
 */
async function start (cli) {
  const env = 'dev'
  const userPort = cli.flags.port

  const port = await getPort(userPort)

  const config = await getConfig()

  const webpackConfig = getWebpackConfig(env, config.plugins)
  const compiler = webpack(webpackConfig)

  const server = new WebpackDevServer(compiler, {
    contentBase: process.cwd(),
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'none'
  })

  server.listen(userPort, 'localhost', (err) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    spawn(`npx electron . --port=${port}`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })
  })
}

module.exports = start
