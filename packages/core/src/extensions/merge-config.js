const webpackMerge = require('webpack-merge');

/**
 * Merges an array of webpack configurations
 * @param {string} env - Current environment
 * @param {Array} configs - Configuration Array to be merged
 * @param {object} initial - Initial Configuration to merge with
 * @returns {object}
 */
function mergeConfig(env, configs, initial) {
  const cloneDeep = require("lodash.clonedeep");
  return configs.reduce((acc, configObj) => {
    const { resolve, options } = configObj;
    return webpackMerge.smart(acc, resolve(env, cloneDeep(acc), options));
  }, initial);
}

module.exports = mergeConfig;
