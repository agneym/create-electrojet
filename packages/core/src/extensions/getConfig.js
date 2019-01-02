module.exports = {
  /**
   * Gets config file from root of the project
   * @returns {Object}
   */
  getConfig: async function() {
    const cosmiconfig = require("cosmiconfig")
    const explorer = cosmiconfig("electrojet")
    try {
      const result = await explorer.search()
      if(!result || result.isEmpty) {
        return require("./defaultConfig");
      } else {
        return result.config;
      }
    } catch(err) {
      console.error("Could not read config file. Please check the following error message for help");
      console.error(err);
      process.exit();
    }
  },

  /**
  * Returns the required webpack configuration merging user and provided configs
  * @param {string} env - Current running environment
  * @param {Object} userConfig - configuration object setup by the user
  * @returns {Object}
  */
  getWebpackConfig: function(env, userConfig) {
    const webpackMerge = require("webpack-merge")
    const ownConfig = require('../webpack.config.js')({
      env
    })

    return userConfig.reduce((acc, configObj) => {
      const { resolve, options } = configObj;
      return webpackMerge(acc, resolve(env, options))
    }, ownConfig)
  },

  /**
   * Get configuration options for packager
   * @param {Object} result
   * @param {boolean} result.isEmpty 
   * @param {Object} result.config
   * @param {Object} result.config.buildOptions - Options for electron packager
   * @returns {Object}
   */
  getPackagerConfig: function(result) {
    const defaultConfig = {
      dir: process.cwd(),
      all: true,
    }
    if(!result) {
      return defaultConfig
    } else {
      return Object.assign(defaultConfig, result)
    }
  }
}