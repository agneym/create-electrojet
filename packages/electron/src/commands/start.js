const core = require("@electrojet/core");
const spawn = require("cross-spawn");

/**
 * Triggered when start command is run from the CLI
 * Starts dev server and sets electron on watch
 * @param {object} cli
 */
async function start(cli) {
  const port = cli.flags.port;

  await core.start({
    flags: {
      port,
    },
  });

  spawn(`npx electron . --port=${port}`, {
    shell: true,
    stdio: "inherit",
    stderr: "inherit",
  });
}

module.exports = start;
