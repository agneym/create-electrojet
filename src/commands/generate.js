module.exports = {
  name: 'create',
  description: 'Create new electron project',
  alias: ['g', 'new', 'n', 'generate', 'c'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info },
      validateName,
      copyFiles,
    } = toolbox

    const name = parameters.first;

    if (!validateName(name)) {
      return
    }

    await copyFiles(name);

    info(`Generated file at models/${name}-model.js`)
  }
}
