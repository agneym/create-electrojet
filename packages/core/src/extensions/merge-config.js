const webpackMerge = require('webpack-merge');

/**
 * Derives the default strategy to be used for webpack merge
 * @param {object | array} result - Result of resolving a plugin
 * @returns {object}
 */
function getStrategy(result) {
  const defaultStrategy = {
    plugins: 'append',
  }
  if(!Array.isArray(result)) {
    return defaultStrategy;
  } else {
    return result[1];
  }
}

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
    const result = resolve(env, cloneDeep(acc), options) || [];
    
    return webpackMerge.smartStrategy(
      getStrategy(result)
    )(acc, result[0] || result);
  }, initial);
}

module.exports = mergeConfig;
