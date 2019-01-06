const core = require("@electrojet/core");

const configObj = require("../extensions/config");
const { getConfig } = require("../extensions/get-config");

/**
 * Triggered when start command is run from the CLI
 * Starts dev server
 * @param {object} cli
 */
async function start(cli) {
  const port = cli.flags.port;

  const config = await getConfig();

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
