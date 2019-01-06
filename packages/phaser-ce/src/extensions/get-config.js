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
        return require("./config").default;
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
};
