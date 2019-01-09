const core = require("@electrojet/core");

const configObj = require("../extensions/config");

/**
 * Triggered when start command is run from the CLI
 * Starts dev server
 * @param {object} cli
 */
async function start(cli) {
  const port = cli.flags.port;

  const config = await core.getConfig();

  await core.start({
    flags: {
      port,
    },
    plugins: [
      {
        resolve: () => configObj.webpack,
      },
    ],
  });
}

module.exports = start;
