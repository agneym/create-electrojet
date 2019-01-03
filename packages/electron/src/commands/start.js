const core = require("@electrojet/core");
const spawn = require("cross-spawn");

const { webpackConfig } = require("../extensions/defaultConfig");
const { getConfig } = require("../extensions/getConfig");
/**
 * Triggered when start command is run from the CLI
 * Starts dev server and sets electron on watch
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
        resolve: () => webpackConfig,
      },
    ],
  });

  spawn(`npx electron . --port=${port}`, {
    shell: true,
    stdio: "inherit",
    stderr: "inherit",
  });
}

module.exports = start;
