const emoji = require("node-emoji");

const { DEFAULT_PACKAGE } = require("../utils/constants");
const greeting = require("../utils/greeting");

module.exports = {
  name: 'create-electrojet',
  description: `Creates new electron project \n\n Usage: \n npm init electrojet <project-name> \n\n ----------- OR --------\n\n npm install -g create-electrojet\n create-electrojet <project-name>`,
  alias: ['g', 'new', 'n', 'generate', 'c', 'create'],
  run: async toolbox => {
    const {
      parameters,
      print: { info, success, printCommands, },
      validate,
      installPackages,
      copyFiles,
    } = toolbox;

    const { first: name, second: repo = DEFAULT_PACKAGE } = parameters;
    
    const props = {
      name,
      repo,
    }

    if (!validate.name(props) && !validate.repo(props)) {
      printCommands(toolbox);
      return;
    }

    greeting(`\n${emoji.get("rocket")}  Welcome to Electrojet CLI\n\n`);

    await copyFiles(props);

    await installPackages(props);

    success(`Generated project under ${props.name}\n`);
    info(`Next Steps:\n\n  1. cd ${props.name}\n  2. npm start`);
  }
}
