const start = require('./src/commands/start');
const build = require('./src/commands/build');
const { getConfig } = require('./src/extensions/get-config');

module.exports = {
  start,
  build,
  getConfig,
};
