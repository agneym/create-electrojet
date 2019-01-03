module.exports = toolbox => {
  const {
    print: { error, info },
    strings: { kebabCase },
  } = toolbox;

  /**
   * Validate name of the application
   * @param {Object} param0
   * @param {string} param0.name - name of the application
   * @returns {boolean}
   */
  function validateName({ name }) {
    if (!name || name.length === 0) {
      error("You must provide a valid CLI name.");
      info("Example: create-electrojet new foo <github-repo>");
      return false;
    } else if (!/^[a-z0-9-]+$/.test(name)) {
      const validName = kebabCase(name);
      error(`${name} is not a valid name. Use lower-case and dashes only.`);
      info(`Suggested: create-electrojet new ${validName}`);
      return false;
    }
    return true;
  }

  function validateOptions({ template, starter }) {
    if (!template && !starter) {
      return false;
    }
    return true;
  }

  /**
   * Validate url for git repo
   * @param {Object} param0
   * @param {string} param0.repo - url for git repo
   * @returns {boolean}
   */
  function validateRepo({ repo }) {
    if (!repo || repo.length === 0) {
      error("You must provide a valid repo name");
      return false;
    }
    return true;
  }

  toolbox.validate = {
    name: validateName,
    repo: validateRepo,
    options: validateOptions,
  };
};
