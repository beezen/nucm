# nucm -- Npm User Change Manager

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)

`nucm` can help you manage NPM account information quickly and easily。Now only NPM source information is managed。

[English](./README.md) | [简体中文](./README_CN.md)

## Install

```bash
$ npm install -g nucm
```

## Example

```bash
$ nucm ls

  beezend -- xxxxxxx
  beezen --- xxxxxxx
* beeze ---- xxxxxxx
```

```bash
$ nucm use beezen

The account has been switched to beezen
```

```bash
$ nucm localize en

Switched to language en
```

```bash
$ nucm add <name> <access-tokens> # Adding a New Account
$ nucm del <name>  # Remove the account
```

## Usage

```bash
Usage: nucm [options] [command]

Options:
  -v,--version                show version
  -h, --help                  display help for command

Commands:
  ls                          show account list
  use <name>                  switch account
  add <name> <access-tokens>  add account
  del <name>                  remove account
  localize <lang>             use localized languages
  install                     initialize
  help [command]              display help for command
```

## Notice

For the time being, we only manage the accounts of the NPM source。We only manage [Access Tokens](https://docs.npmjs.com/about-access-tokens) published by NPM。

> An access token is an alternative to using your username and password for authenticating to npm when using the API or the npm command-line interface (CLI). An access token is a hexadecimal string that you can use to authenticate, and which gives you the right to install and/or publish your modules.

## LICENSE

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
