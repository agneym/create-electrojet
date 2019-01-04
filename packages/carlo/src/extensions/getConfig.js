module.exports = {
  /**
   * Gets config file from root of the project
   * @returns {Object}
   */
  getConfig: async function() {
    const cosmiconfig = require("cosmiconfig");
    const explorer = cosmiconfig("electrojet");
    try {
      const result = await explorer.search();
      if (!result || result.isEmpty) {
        return require("./defaultConfig");
      } else {
        return result.config;
      }
    } catch (err) {
      console.error(
        "Could not read config file. Please check the following error message for help"
      );
      console.error(err);
      process.exit();
    }
  },

  /**
   * Get configuration options for packager
   * @param {Object} result
   * @param {boolean} result.isEmpty
   * @param {Object} result.config
   * @param {Object} result.config.buildOptions - Options for carlo packager
   * @returns {Object}
   */
  getPackagerConfig: function(result) {
    const defaultConfig = {
      dir: process.cwd(),
      all: true,
    };
    if (!result) {
      return defaultConfig;
    } else {
      return Object.assign(defaultConfig, result);
    }
  },

  /**
   * Create build config
   * @param {Object} userOptions
   * @param {string} userOptions.target
   * @param {string} userOptions.host
   */
  createBuildOptions: function(userOptions) {
    const { target, host } = userOptions;
    const buildOptions = [process.pwd()];
    if (target) {
      buildOptions.push("--target");
      buildOptions.push(userOptions.target);
    }
    if (host) {
      buildOptions.push("--host");
      buildOptions.push(userOptions.host);
    }
    return buildOptions;
  },
};
