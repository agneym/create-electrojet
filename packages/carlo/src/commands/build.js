const core = require("@electrojet/core");
const ora = require("ora");
const { exec } = require("pkg");

const {
  getPackagerConfig,
  getConfig,
  createBuildOptions,
} = require("../extensions/get-config");

/**
 * Triggered when build command is run from the CLI
 * Runs webpack build and generates package with pkg
 * @param {Object} cli
 */
async function build(cli) {
  const userConfig = await getConfig();

  await core.build({
    plugins: [
      {
        resolve: () => {},
      },
    ],
  });

  const spinner = ora("Starting to generate build").start();

  try {
    const userPkgConfig = await getPackagerConfig(userConfig.buildOptions);

    await exec(createBuildOptions(userPkgConfig));
    spinner.succeed(`Generated builds successfully`);
  } catch (error) {
    spinner.fail(`Could not generate build :(
      ${error}  
    `);
  }
}

module.exports = build;
