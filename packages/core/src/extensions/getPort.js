const detect = require('detect-port');
const { prompt } = require('enquirer');

async function getPort(userPort) {
  const _port = await detect(userPort);
  if (_port === userPort) {
    return userPort;
  } else {
    const answer = await prompt({
      type: 'confirm',
      name: 'port',
      message: `Seems like ${userPort} is being used by another application. \nWould you like to try ${_port}?`,
    });
    if (!answer.port) {
      console.warn('\nConsider rerunning the script with --port flag');
      process.exit();
    } else {
      return Promise.resolve(_port);
    }
  }
}

module.exports = getPort;
