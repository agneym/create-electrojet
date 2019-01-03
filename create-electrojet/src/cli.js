const { build } = require('gluegun')

/**
 * Create the cli and kick it off
 */
async function run (argv) {
  const cli = build()
    .brand('create-electrojet')
    .src(__dirname)
    .plugins('./node_modules', {
      matching: 'create-electrojet-*',
      hidden: true
    })
    .help()
    .version()
    .create()

  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
