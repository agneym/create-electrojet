const path = require("path");

module.exports = toolbox => {
  async function copyFiles(name) {
    const {
      filesystem: { copy, dir, },
      patching: { update, },
    } = toolbox;

    await dir(name);

    const templates = path.resolve(__dirname, '../templates');

    update(path.join(templates, 'package.json'), (config) => {
      config.name = name;
      return config;
    });

    return copy(templates, `${name}/`, {
      overwrite: true,
    });
  }

  toolbox.copyFiles = copyFiles;
}