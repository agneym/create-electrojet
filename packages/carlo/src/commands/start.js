const core = require("@electrojet/core");
const spawn = require("cross-spawn");
const path = require("path");

const { webpackConfig } = require("../extensions/defaultConfig");
const { getConfig } = require("../extensions/getConfig");
const invokeScript = require("../extensions/invokeScript");

/**
 * Triggered when start command is run from the CLI
 * Starts dev server and sets carlo on watch
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

  await invokeScript(config, "prestart");

  const dir = process.cwd();

  const carloPath = require(path.resolve(dir, "node_modules/carlo"));
  spawn(`${carlo} ${dir} --port=${port}`, {
    shell: true,
    stdio: "inherit",
    stderr: "inherit",
  });
}

module.exports = start;
