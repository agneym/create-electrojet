module.exports = {
  name: 'create',
  alias: ['g', 'new', 'n', 'generate', 'c'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info },
      validateName,
    } = toolbox

    const name = parameters.first;

    if (!validateName(name)) {
      return
    }

    await filesystem.dir(props.name)

    await generate({
      template: 'model.js.ejs',
      target: `models/${name}-model.js`,
      props: { name }
    })

    info(`Generated file at models/${name}-model.js`)
  }
}
