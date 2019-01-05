/**
 * Invoke a particular function from config object
 * @param {Object} config - Configuration Object for CLI
 * @param {string} key - Hook that needs to be run
 */
function invokeScript(config, key) {
  if (config.hasOwnProperty(key)) {
    return config[key]();
  }
}

module.exports = invokeScript;
