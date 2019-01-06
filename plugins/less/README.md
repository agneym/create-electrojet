<div align="center">
  <h1>LESS Plugin for Electrojet CLI</h1>
  <a href="https://badge.fury.io/js/%40electrojet%2Fsass"><img src="https://badge.fury.io/js/%40electrojet%2Fsass.svg" alt="npm version" height="18"></a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://standardjs.com">
    <img alt="coding style: standard" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
</div>

## Usage

1. Install:

```
npm install --save-dev less @electrojet-less
```

2. In your `electrojet.config.js` file, add:

```js
const less = require("@electrojet-less");

module.exports = {
  plugins: [
    {
      resolve: less,
      options: optionsToLessPlugin,
    }
  ]
}
```

3. Restart your running script.


