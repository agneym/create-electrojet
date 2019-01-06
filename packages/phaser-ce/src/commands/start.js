const core = require("@electrojet/core");
const spawn = require("cross-spawn");

const configObj = require("../extensions/config");
const { getConfig } = require("../extensions/get-config");
const invokeScript = require("../extensions/invoke-script");

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

  await invokeScript(config, "prestart");

  const dir = process.cwd();

  spawn(`node ${dir} --port=${port}`, {
    shell: true,
    stdio: "inherit",
    stderr: "inherit",
  });
}

module.exports = start;
