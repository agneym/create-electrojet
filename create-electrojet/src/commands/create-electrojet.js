module.exports = {
  name: 'create-electrojet',
  description: `Creates new electron project \n\n Usage: \n npm init electrojet <project-name> \n\n ----------- OR --------\n\n npm install -g create-electrojet\n create-electrojet <project-name>`,
  alias: ['g', 'new', 'n', 'generate', 'c', 'create'],
  run: async toolbox => {
    const {
      parameters,
      print: { info, success },
      validateName,
      installPackages,
      copyFiles,
    } = toolbox;

    const name = parameters.first;

    const props = {
      name
    }

    if (!validateName(name)) {
      return;
    }

    await copyFiles(name);

    await installPackages(props);

    success(`Generated project under ${props.name}`);
    info(`Next Steps:\n  1. cd ${props.name}\n  2. npm start`);
  }
}
