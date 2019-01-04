const core = require("@electrojet/core");
const ora = require("ora");

const { getPackagerConfig, getConfig } = require("../extensions/getConfig");
const { webpackConfig } = require("../extensions/defaultConfig");

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets carlo on watch
 * @param {Object} cli
 */
async function build(cli) {
  const userConfig = await getConfig();

  await core.build({
    plugins: [
      {
        resolve: () => webpackConfig,
      },
    ],
  });

  const spinner = ora("Starting to generate build").start();

  try {
    const userPkgConfig = await getPackagerConfig(userConfig.buildOptions);
    
    const appPaths = await packager(userPkgConfig);
    spinner.succeed(`Generated builds successfully at
      ${appPaths.join("\n")}
    `);
  } catch (error) {
    spinner.fail(`Could not generate build :(
      ${error}  
    `);
  }
}

module.exports = build;
