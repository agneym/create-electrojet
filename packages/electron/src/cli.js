#!/usr/bin/env node
const meow = require("meow");

const start = require("../src/commands/start");
const build = require("../src/commands/build");
const validateCommand = require("./extensions/validateCommand");

function run() {
  const cli = meow(
    `
    Usage
      $ electrojet-electron <input>
    
    Options
      --port, -p Port
 
    Examples
      Start the script in development mode.
      $ electrojet-electron start --port=4567

      Build the app into build targets
      $ electrojet-electron build
  `,
    {
      flags: {
        port: {
          type: "number",
          alias: "p",
          default: 4567,
        },
      },
    }
  );

  const command = cli.input[0]

  if (validateCommand(cli, command)) {
    switch (command) {
      case "start":
        start(cli);
        break;
      case "build":
        build(cli);
        break;
    }
  }
}

module.exports = { run };
