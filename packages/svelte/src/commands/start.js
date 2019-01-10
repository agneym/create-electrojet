const core = require("@electrojet/core");

const configObj = require("../extensions/config");

/**
 * Triggered when start command is run from the CLI
 * Starts dev server
 * @param {object} cli
 */
async function start(cli) {
  const port = cli.flags.port;

  await core.start({
    flags: {
      port,
    },
    plugins: [
      {
        resolve: (env, context, options) => configObj.webpack(env, context, options),
      },
    ],
  });
}

module.exports = start;
