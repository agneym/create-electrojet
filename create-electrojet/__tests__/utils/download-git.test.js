jest.mock('download-git-repo');
const download = require("download-git-repo");

const downloadGit = require("../../src/utils/download-git");

describe('download git function', () => {
  test('should call download git', async () => {
    download.mockImplementation((repo, target, options, callback) => callback());
    await downloadGit();
    expect(download.mock.calls.length).toBe(1);
  });

  test('should fail loudly on error', async () => {
    download.mockImplementation((repo, target, options, callback) => callback('error'));
    try {
      await downloadGit();
    } catch(err) {
      expect(err).toBeTruthy();
    }
  });

  test('should resolve on no errors', async () => {
    download.mockImplementation((repo, target, options, callback) => callback());
    await expect(downloadGit()).resolves.toBeUndefined();
  });
})