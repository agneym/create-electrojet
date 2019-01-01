module.exports = {
  name: 'create-electrojet',
  description: `Creates new electron project \n\n Usage: \n npm init electrojet <project-name> \n\n ----------- OR --------\n\n npm install -g create-electrojet\n create-electrojet <project-name>`,
  alias: ['g', 'new', 'n', 'generate', 'c', 'create'],
  run: async toolbox => {
    const {
      parameters,
      print: { info, success },
      validate,
      installPackages,
      copyFiles,
    } = toolbox;

    const { first: name, second: repo } = parameters;
    
    const props = {
      name,
      repo,
    }

    if (!validate.name(props) && !validate.repo(props)) {
      return;
    }

    success("Welcome to Electrojet CLI");

    await copyFiles(props);

    await installPackages(props);

    success(`Generated project under ${props.name}`);
    info(`Next Steps:\n  1. cd ${props.name}\n  2. npm start`);
  }
}
