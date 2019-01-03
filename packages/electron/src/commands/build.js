const packager = require("electron-packager");
const core = require("@electrojet/core");
const ora = require("ora");
const rebuild = require("electron-rebuild");

const { getPackagerConfig, getConfig } = require("../extensions/getConfig");

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets electron on watch
 * @param {Object} cli
 */
async function build(cli) {
  const userConfig = await getConfig();

  await core.build();

  const spinner = ora("Starting to generate build").start();

  try {
    const userPkgConfig = await getPackagerConfig(userConfig.buildOptions);
    const config = Object.assign(userPkgConfig, {
      afterCopy: [
        (buildPath, electronVersion, platform, arch, callback) => {
          rebuild({ buildPath, electronVersion, arch })
            .then(() => callback())
            .catch(error => callback(error));
        },
      ],
    });
    const appPaths = await packager(config);
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
