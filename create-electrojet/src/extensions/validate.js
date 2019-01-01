module.exports = toolbox => {
  const {
    print: { error, info },
    strings: { kebabCase }
  } = toolbox;
  
  function validateName({ name }) {
    if (!name || name.length === 0) {
      error('You must provide a valid CLI name.');
      info('Example: create-electrojet new foo <github-repo>');
      return false;
    } else if (!/^[a-z0-9-]+$/.test(name)) {
      const validName = kebabCase(name);
      error(`${name} is not a valid name. Use lower-case and dashes only.`);
      info(`Suggested: create-electrojet new ${validName}`);
      return false;
    }
    return true;
  }

  function validateRepo({ name, repo }) {
    if(!repo || repo.length === 0) {
      error('You must provide a valid repo name');
      info(`Example: create-electrojet new ${name} ${repo}`);
      return false;
    }
    return true;
  }

  toolbox.validate = {
    name: validateName,
    repo: validateRepo,
  };
}