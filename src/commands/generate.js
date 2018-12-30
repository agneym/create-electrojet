module.exports = {
  name: 'create',
  description: 'Create new electron project',
  alias: ['g', 'new', 'n', 'generate', 'c'],
  run: async toolbox => {
    const {
      parameters,
      print: { success },
      validateName,
      installPackages,
      copyFiles,
    } = toolbox;

    const name = parameters.first;

    const props = {
      name
    }

    if (!validateName(name)) {
      return
    }

    await copyFiles(name);

    await installPackages(props);

    success(`Generated project under ${props.name}`);
  }
}
