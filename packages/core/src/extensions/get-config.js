const { exists } = require("fs-jetpack");
const path = require("path");

const mergeConfig = require('./merge-config');

module.exports = {
  /**
   * Gets config file from root of the project
   * @returns {Object}
   */
  getConfig: async function() {
    const cosmiconfig = require('cosmiconfig');
    const explorer = cosmiconfig('electrojet');
    try {
      const result = await explorer.search();
      if (!result || result.isEmpty) {
        return require('./default-config');
      } else {
        return result.config;
      }
    } catch (err) {
      console.error(
        'Could not read config file. Please check the following error message for help'
      );
      console.error(err);
      process.exit();
    }
  },

  /**
   * Returns the required webpack configuration merging user and provided configs
   * @param {string} env - Current running environment
   * @param {Object} renderConfig - configuration object setup by the user
   * @param {Object} pluginConfig - configuration object setup by the user
   * @returns {Object}
   */
  getWebpackConfig: function(env, renderConfig = [], pluginConfig = []) {
    const userConfig = path.resolve(process.cwd(), 'webpack.config.js');
    if(exists(userConfig)) {
      return require(userConfig);
    }
    const ownConfig = require('../webpack.config.js')({
      env,
    });

    return mergeConfig(env, [...renderConfig, ...pluginConfig], ownConfig);
  },
};
