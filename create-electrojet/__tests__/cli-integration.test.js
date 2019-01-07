const { system } = require('gluegun');
const { resolve } = require('path');

const src = resolve(__dirname, '..');

const cli = async cmd =>
  system.run('node ' + resolve(src, 'bin', 'create-electrojet') + ` ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  const original = require('../package.json');
  expect(output).toContain(original.version);
})

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('npm init electrojet');
})


