const path = require("path");
const downloadGit = require("../utils/download-git");

module.exports = toolbox => {
  async function copyFiles({ name, repo }) {
    const {
      filesystem: { dir, },
      patching: { update, },
      print,
    } = toolbox;
    console.log(name);
    await dir(name);

    try {
      await downloadGit(repo, path.join(process.cwd(), name));
    } catch(error) {
      print.error(error);
      return;
    }
      
    print.success("Fetched repository successfully");

    await update(path.join(process.cwd(), name, 'package.json'), (config) => {
      config.name = name;
      return config;
    });
  }

  toolbox.copyFiles = copyFiles;
}