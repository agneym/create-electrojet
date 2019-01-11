const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { getConfig, getWebpackConfig } = require('../extensions/get-config');
const getPort = require('../extensions/get-port');

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server on watch
 * @param {object} options
 * @returns {Promise}
 */
async function start(options = {}) {
  const env = 'dev';
  const userPort = options.flags.port;

  const port = await getPort(userPort);

  const config = await getConfig();

  const webpackConfig = getWebpackConfig(env, options.plugins, config.plugins);
  console.log(webpackConfig);
  const compiler = webpack(webpackConfig);

  const server = new WebpackDevServer(compiler, Object.assign(webpackConfig.devServer, { port }));

  return new Promise(resolve => {
    server.listen(port, 'localhost', err => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        throw new Error(err);
      }

      return resolve();
    });
  });
}

module.exports = start;
