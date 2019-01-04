const mergeConfig = require('./mergeConfig');

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
        return require('./defaultConfig');
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
   * @param {Object} userConfig - configuration object setup by the user
   * @returns {Object}
   */
  getWebpackConfig: function(env, renderConfig = [], userConfig = []) {
    const ownConfig = require('../webpack.config.js')({
      env,
    });

    return mergeConfig(env, [...renderConfig, ...userConfig], ownConfig);
  },
};
