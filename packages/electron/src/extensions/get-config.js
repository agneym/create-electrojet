module.exports = {
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
    };
    if (!result) {
      return defaultConfig;
    } else {
      return Object.assign(defaultConfig, result);
    }
  },
};
