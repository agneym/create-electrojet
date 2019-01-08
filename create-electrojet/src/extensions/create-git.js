module.exports = toolbox => {
  const {
    print: {
      spin,
    },
    system: {
      which,
      spawn,
    }
  } = toolbox;

  function detectGit() {
    return !!which('git');
  }

  async function createGit({ name }) {
    const spinner = spin("Starting git setup").start();
    if(!detectGit()) {
      spinner.fail("Could not detect git on the system");
      return;
    } else {
      try {
        await spawn(`cd ${name} && git init && git add . && git commit --author="Electrojet Bot <>" -m "Initial Commit" &> /dev/null`, {
          shell: true,
          stdio: "inherit",
          stderr: "inherit",
        });
        spinner.succeed("Initialised git repository");
      } catch(error) {
        spinner.fail("Failed to create git repository")
      }
    }
  }

  toolbox.createGit = createGit;
}