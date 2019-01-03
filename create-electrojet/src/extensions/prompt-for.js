const { DEFAULT_PACKAGES } = require("../utils/constants");

module.exports = toolbox => {
  const {
    prompt,
    validate,
  } = toolbox;

  async function forStarter() {
    const question = [{
      type: 'input',
      name: 'starter',
      message: `Please enter starter git in format:
        <username>/<repo-name>
        For eg: BoywithSilverWings/default-starter
      `,
    }];
    const { starter } = await prompt.ask(question);
    if(validate.repo(starter)) {
      return {
        type: 'starter',
        value: starter,
      }
    } else {
      return promptFor('template');
    }
  }

  async function forTemplate() {
    const GIT_STARTER_PROMPT = 'Choose a git starter instead';
    const question = [{
      type: 'list',
      name: 'template',
      message: 'Please select template you are building for',
      choices: [Object.keys(DEFAULT_PACKAGES), GIT_STARTER_PROMPT]
    }];
    const { template } = await prompt.ask(question);
    if (template === GIT_STARTER_PROMPT) {
      return forStarter();
    } else {
      return {
        type: 'template',
        value: template,
      }
    }
  }

  /**
   * prompt for an item from the user
   * @param {string} item - What to prompt for
   * @return {Object}
   */
  function promptFor(item) {
    if(item === 'template') {
      return forTemplate();
    } else if(item === 'starter') {
      return forStarter();
    }
  }

  toolbox.promptFor = promptFor;
}