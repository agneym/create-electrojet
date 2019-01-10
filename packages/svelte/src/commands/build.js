const core = require("@electrojet/core");
const ora = require("ora");

const configObj = require("../extensions/config");

/**
 * Triggered when build command is run from the CLI
 * Runs webpack to generate build
 * @param {Object} cli
 */
async function build(cli) {
  let spinner = ora("Starting to generate build");
  try {
    await core.build({
      plugins: [
        {
          resolve: (env, context, options) => configObj.webpack(env, context, options),
        },
      ],
    });

    spinner.start();  // webpackbar writes to the screen, so cannot start spinner before.

    spinner.succeed(`Generated builds successfully`);
  } catch(error) {
    spinner.fail(`Could not generate build :(
      ${error}  
    `);
  }
}

module.exports = build;
