const path = require("path");
const downloadGit = require("../utils/download-git");

module.exports = toolbox => {
  async function copyFiles({ name, repo }) {
    const {
      filesystem: { dir, exists },
      patching: { update, },
      print,
      prompt: { confirm },
    } = toolbox;

    if(exists(name)) {
      print.warning(`A file/folder by this name already exists`);
      const continueOps = await confirm("Are you sure to continue?");
      if(!continueOps) {
        process.exit();
      }
    }

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