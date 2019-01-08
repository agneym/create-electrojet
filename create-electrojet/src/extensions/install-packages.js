const chalk = require("chalk");

module.exports = toolbox => {
  const {
    system: { which, spawn },
    print: { info },
  } = toolbox;

  async function checkThatNpmCanReadCwd() {
    const cwd = process.cwd();
    let childOutput = null;
    try {
      /* Note: intentionally using spawn over exec since
      the problem doesn't reproduce otherwise.
      `npm config list` is the only reliably way I could find
      to reproduce the wrong path. Just printing process.cwd()
      in a Node process was not enough. */
      childOutput = await spawn('npm', ['config', 'list']).output.join('');
    } catch (err) {
      /* Something went wrong spawning node.
      Not great, but it means we can't do this check.
      We might fail later on, but let's continue. */
      return true;
    }
    if (typeof childOutput !== 'string') {
      return true;
    }
    const lines = childOutput.split('\n');
    /* `npm config list` output includes the following line:
    "; cwd = C:\path\to\current\dir" (unquoted)
    I couldn't find an easier way to get it. */
    const prefix = '; cwd = ';
    const line = lines.find(line => line.indexOf(prefix) === 0);
    if (typeof line !== 'string') {
      // Fail gracefully. They could remove it.
      return true;
    }
    const npmCWD = line.substring(prefix.length);
    if (npmCWD === cwd) {
      return true;
    }
    console.error(
      chalk.red(
        `Could not start an npm process in the right directory.\n\n` +
        `The current directory is: ${chalk.bold(cwd)}\n` +
        `However, a newly started npm process runs in: ${chalk.bold(
          npmCWD
        )}\n\n` +
        `This is probably caused by a miconfigured system terminal shell.`
      )
    );
    if (process.platform === 'win32') {
      console.error(
        chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
        chalk.red(`Try to run the above two lines in the terminal.\n`) +
        chalk.red(
          `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
        )
      );
    }
    return false;
  }

  /**
   * Finds the system installed path of package manager to be used
   * @param {boolean} npmFlag Boolean flag from user for using npm as package manager
   * @returns {string}
   */
  async function determinePackageManager(npmFlag) {
    const npmPath = which("npm");
    const yarnPath = which("yarn");
    if (npmFlag) {
      if(!await checkThatNpmCanReadCwd()) {
        return false;
      }
      return npmPath;
    } else if(yarnPath) {
      return yarnPath;
    } else {
      if (!await checkThatNpmCanReadCwd()) {
        return false;
      }
      return npmPath;
    }
  }

  /**
   * Installs packages in package.json
   * @param {string} root root of project
   * @param {Object} props
   * @param {string} props.name name of the repository
   * @param {boolean} props.npm indictor for using npm as package manager
   */
  async function installPackages(root, props) {
    const packageManager = await determinePackageManager(props.npm);

    info("Starting package installation");

    /* Explicitly set cwd() to work around issues like
    https://github.com/facebookincubator/create-react-app/issues/3326.
    Unfortunately we can only do this for Yarn because npm support for
    equivalent --prefix flag doesn't help with this issue.
    This is why for npm, we run checkThatNpmCanReadCwd() early instead. */
    return spawn(`cd ${props.name} && ${packageManager} install --cwd=${root}`, {
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
