module.exports = toolbox => {
  function installPackages(props) {
    const {
      system: { which, spawn },
      print: { info },
    } = toolbox;

    const npmPath = which('npm');

    info("Starting package installation");

    return spawn(`cd ${props.name} && ${npmPath} install --silent && ${npmPath} run --quiet format`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    });
  }

  toolbox.installPackages = installPackages;
}