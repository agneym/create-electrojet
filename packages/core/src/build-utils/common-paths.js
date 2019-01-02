const path = require('path')

module.exports = {
  appSrc: path.join(process.cwd(), 'src/index.js'),
  appDist: path.join(process.cwd(), 'dist'),
  index: path.join(process.cwd(), 'src/index.html')
}
