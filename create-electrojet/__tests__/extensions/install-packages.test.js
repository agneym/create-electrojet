
const installPackages = require("../../src/extensions/install-packages");

describe('determine package manager', () => {
  beforeAll(() => {
    this.which = jest.fn();
    this.toolbox = {
      system: {
        which: this.which,
      },
      print: {
        info: () => {},
        error: () => {}, 
      }
    }
  });

  test('returns npm when flag is true', async () => {
    this.which.mockImplementation((mng) => mng === 'npm' ? 'npm' : 'yarn');
    const path = await installPackages(this.toolbox).determinePackageManager(true);
    expect(path).toBe("npm");
  });

  test('returns yarn on a system with yarn path', async () => {
    this.which.mockImplementation(() => 'yarn');
    const path = await installPackages(this.toolbox).determinePackageManager(false);
    expect(path).toBe("yarn");
  });

  test('returns npm on a system with yarn not available', async () => {
    this.which.mockImplementation(() => 'npm');
    const path = await installPackages(this.toolbox).determinePackageManager(false);
    expect(path).toBe("npm");
  });
});

describe('install packages', () => {
  beforeAll(() => {
    this.spawn = jest.fn();
    this.toolbox = {
      system: {
        which: () => {},
        spawn: this.spawn,
      },
      print: {
        info: () => { },
        error: () => { },
      }
    }
    this.prop = {
      npm: true,
    }
  });

  test('spawns a process', async () => {
    installPackages(this.toolbox).installPackages("", this.prop);
    expect(this.spawn.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  test('tries to install', async () => {
    await installPackages(this.toolbox).installPackages("", this.prop);
    expect(this.spawn.mock.calls[1][0]).toContain('install');
  });
});
