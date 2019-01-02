const chalk = require('chalk')

/**
 * Analyses the command from user and validates it
 * @param {Object} cli
 * @param {string} userCommand
 * @returns {boolean}
 */
function validateCommand (cli, userCommand) {
  const commands = ['start', 'build']
  const command = userCommand.trim()
  if (!command || !commands.includes(command)) {
    chalk.error('Please enter a valid command')
    cli.showHelp()
    return false
  }
  return true
}

module.exports = validateCommand
