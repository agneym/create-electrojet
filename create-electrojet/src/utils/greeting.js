const chalk = require("chalk");

/**
 * Outputs specific style to console
 * @param {string} text
 */
const greeing = (text) => {
  console.log(chalk.bold.cyanBright(text));
}

module.exports = greeing;