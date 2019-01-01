const chalk = require("chalk");

const greeing = (text) => {
  console.log(chalk.bold.cyanBright(text));
}

module.exports = greeing;