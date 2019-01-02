const webpackMerge = require('webpack-merge');

const commonConfig = require('./build-utils/webpack.common.js');

module.exports = ({ env }) => {
  process.env.NODE_ENV = env === 'PROD' ? 'production' : 'development';
  const envConfig = require(`./build-utils/webpack.${env}.js`);
  return webpackMerge(commonConfig, envConfig);
};
