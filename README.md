<div align="center">
  <h1>ELECTROJET CLI</h1>
  <a href="https://badge.fury.io/js/create-electrojet"><img src="https://badge.fury.io/js/create-electrojet.svg" alt="npm version" height="18"></a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://standardjs.com">
    <img alt="coding style: standard" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
</div>


## Usage

```
npm init electrojet <project-name>
```

The CLI will walk you through a set of options for you to select the template/starter. 

### Options

#### 1. Template

This option allows you to select the template beforehand.

```
npm init electrojet <project-name> --template=electron
```

[See list of currently available templates](https://github.com/BoyWithSilverWings/create-electrojet#list-of-available-templates)

#### 2. Starter

This option allows you to select a starter beforehand.

```
npm init electrojet <project-name> --starter=<User>/<RepoName>
```

This format works for repositories hosted on github. 

[How do I customise it to work with Gitlab /  Bitbucket?](https://github.com/BoyWithSilverWings/create-electrojet#)

#### How are they different?

A template offers a default configuration for a given technology. For eg. selecting electron as a template, gives you a package with Electron, Javascript, CSS and HTML.

A starter is much more customised and opiniated in it's design. For example, a starter may have Electron with React and Redux installed and setup for you to start working.


## How do I add _______ to the configuration?

1. Add a plugin

    There are plugins available for Electrojet that can add functionality to existing configurations. 
    You can add them to `electrojet.config.js` plugins array.

    [List of Plugins](https://github.com/BoyWithSilverWings/create-electrojet#list-of-plugins)

2. Roll your own

    If you can't find a plugin, you can always write one. 

    In your plugins directory, add a function that takes the format:

  ```js
  module.exports = {
    plugins: [
      {
        resolve: function (
          env,  // Current running env, either "dev" or "prod". Allows you to create multiple configs for development and production
          context,  // The current configuration, mutating this won't help
          options,  // options from the user, you don't need this for writing custom config
        ) {
          return customConfig; // Return custom configuration
        }
      }
    ]
  }
  ```

  The webpack configuration object that you return from the resolve functions gets [shallow merged](https://github.com/survivejs/webpack-merge#mergesmartconfiguration-configuration) into running configuration. 

## List of available templates

1. [Electron](https://github.com/BoyWithSilverWings/create-electrojet/tree/master/packages/electron)
2. [Carlo](https://github.com/BoyWithSilverWings/create-electrojet/tree/master/packages/carlo)


## List of plugins

1. [SASS](https://github.com/BoyWithSilverWings/create-electrojet/tree/master/plugins/sass)
2. [LESS](https://github.com/BoyWithSilverWings/create-electrojet/tree/master/plugins/less)

## How do I customise it to with Bitbucket / Gitlab Templates

> Docs in progress