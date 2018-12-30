const copy = require('recursive-copy');

module.exports = toolbox => {
  async function copyFiles(name) {
    const {
      filesystem,
      template: { generate },
    } = toolbox;

    await filesystem.dir(name);

    const files = [
      'package.json.ejs',
      'README.md.ejs',
    ];

    const configFiles = files.reduce((acc, file) => {
      const template = `/${file}`;
      const target = `${name}/${file.replace('.ejs', '')}`;
      const props = { name };
      const gen = generate({ template, target, props });
      return acc.concat([gen]);
    }, []);

    await Promise.all(configFiles);

    return copy('src/templates/source', `${name}/`);
  }

  toolbox.copyFiles = copyFiles;
}