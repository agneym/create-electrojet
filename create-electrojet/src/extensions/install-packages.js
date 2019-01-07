module.exports = toolbox => {
  const {
    system: { which, spawn },
    print: { info },
  } = toolbox;

  /**
   * Finds the system installed path of package manager to be used
   * @param {boolean} npmFlag Boolean flag from user for using npm as package manager
   * @returns {string}
   */
  function determinePackageManager(npmFlag) {
    const npmPath = which("npm");
    const yarnPath = which("yarn");
    if (npmFlag) {
      return npmPath;
    } else {
      return yarnPath || npmPath;
    }
  }

  /**
   * Installs packages in package.json
   * @param {Object} props
   * @param {string} props.name name of the repository
   * @param {boolean} props.npm indictor for using npm as package manager
   */
  function installPackages(props) {
    const packageManager = determinePackageManager(props.npm);

    info("Starting package installation");

    return spawn(`cd ${props.name} && ${packageManager} install`, {
      shell: true,
      stdio: "inherit",
      stderr: "inherit",
    });
  }

  toolbox.installPackages = installPackages;

  return {
    determinePackageManager,
    installPackages,
  } 
};
