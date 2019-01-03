const download = require("download-git-repo");

/**
 * Downlaod git repo to target folder
 * @param {string} repo - URL string for Git repo
 * @param {string} target - Target path
 * @returns {Promise}
 */
function downloadGit(repo, target) {
  return new Promise(resolve => {
    download(repo, target, {}, error => {
      if (error) {
        throw new Error(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = downloadGit;
