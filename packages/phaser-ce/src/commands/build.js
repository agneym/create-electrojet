const core = require("@electrojet/core");
const ora = require("ora");

const configObj = require("../extensions/config");

const {
  getConfig,
} = require("../extensions/get-config");

/**
 * Triggered when build command is run from the CLI
 * Runs webpack to generate build
 * @param {Object} cli
 */
async function build(cli) {
  const userConfig = await getConfig();

  const spinner = ora("Starting to generate build").start();
  try {
    await core.build({
      plugins: [
        {
          resolve: () => configObj.webpack,
        },
      ],
    });
    spinner.succeed(`Generated builds successfully`);
  } catch(error) {
    spinner.fail(`Could not generate build :(
      ${error}  
    `);
  }
}

module.exports = build;
