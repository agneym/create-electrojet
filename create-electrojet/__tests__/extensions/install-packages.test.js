
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

  test('returns npm when flag is true', () => {
    this.which.mockImplementation(mng => mng === 'npm' ? 'npm' : 'yarn');
    const path = installPackages(this.toolbox).determinePackageManager(true);
    expect(path).toBe("npm");
  });

  test('returns yarn on a system with yarn path', () => {
    this.which.mockImplementation(() => 'yarn');
    const path = installPackages(this.toolbox).determinePackageManager(false);
    expect(path).toBe("yarn");
  });

  test('returns npm on a system with yarn not available', () => {
    this.which.mockImplementation(() => 'npm');
    const path = installPackages(this.toolbox).determinePackageManager(false);
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

  test('spawns a process', () => {
    installPackages(this.toolbox).installPackages(this.prop);
    expect(this.spawn.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  test('tries to install', () => {
    installPackages(this.toolbox).installPackages(this.prop);
    expect(this.spawn.mock.calls[0][0]).toContain('install');
  });
});
