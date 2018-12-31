const download = require("download-git-repo");

function downloadGit(repo, target) {
  return new Promise((resolve) => {
    download(repo, target, {}, (error) => {
      if(error) {
        throw new Error(error);
      } else {
        resolve();
      }
    });
  })
}

module.exports = downloadGit;

