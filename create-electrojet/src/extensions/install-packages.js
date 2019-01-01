module.exports = toolbox => {
  function installPackages(props) {
    const {
      system: { which, spawn },
      print: { info },
    } = toolbox;

    const packageManager = which('yarn') ? 'yarn' : 'npm';

    info("Starting package installation");

    return spawn(`cd ${props.name} && ${packageManager} install`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    });
  }

  toolbox.installPackages = installPackages;
}