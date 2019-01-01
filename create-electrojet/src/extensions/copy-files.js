const path = require("path");
const downloadGit = require("../utils/download-git");

module.exports = toolbox => {
  async function copyFiles({ name, repo }) {
    const {
      filesystem: { dir, },
      patching: { update, },
      print,
    } = toolbox;

    await dir(name);

    const spinner = print.spin("Trying to fetch git repo: ", repo).start();

    try {
      await downloadGit(repo, path.join(process.cwd(), name));
      spinner.succeed("Fetched repo successfully");
    } catch(error) {
      spinner.fail("Failed to fetch repository");
      print.error(error);
      process.exit();
      return;
    }

    spinner.text = "Updating file information";
    spinner.start();

    await update(path.join(process.cwd(), name, 'package.json'), (config) => {
      config.name = name;
      return config;
    });

    spinner.succeed("Updated File Information");
  }

  toolbox.copyFiles = copyFiles;
}