# nucm -- Npm User Change Manager

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)

`nucm` can help you manage NPM account information quickly and easily.

[English](./README.md) | [简体中文](./README_CN.md)

## Install

```bash
# Global installation
$ npm install -g nucm # OR yarn global add nucm
```

## Example

```bash
# View the current source account
$ nucm ls

  beezend -- xxxxxx......xxxx
  beezen --- xxxxxx......xxxx
* beeze ---- xxxxxx......xxxx

# View the current source account, more information
$ nucm ls -l

  beezend -- xxxxxxxxxxxxxxxx
  beezen --- xxxxxxxxxxxxxxxx
* beeze ---- xxxxxxxxxxxxxxxx

# View all source accounts
$ nucm ls -a

【npm】
  beezend -- xxxxxx......xxxx
  beezen --- xxxxxx......xxxx
* beeze ---- xxxxxx......xxxx

【maclocal】
* test ----- xxxxxx......xxxx
```

```bash
# Switch account
$ nucm use beezen

The account has been switched to beezen
```

```bash
# Localization language
$ nucm localize en

Switched to language en
```

```bash
# Add an account
$ nucm add <name> <access-tokens>

# Remove account
$ nucm del <name>
```

```bash
# Save the current login account
$ nucm save
```

## Usage

```bash
Usage: nucm [options] [command]

Options:
  -v,--version                show version
  -h, --help                  display help for command

Commands:
  ls [options]                show account list
  use <name>                  switch account
  add <name> <access-tokens>  add account
  del <name>                  remove account
  localize <lang>             use localized languages
  install                     initialize
  update [options]            updated version
  save                        Save the current account
  help [command]              display help for command
```

## Notice

We manage the [Access Token](https://docs.npmjs.com/about-access-tokens) released by NPM.

> An access token is an alternative to using your username and password for authenticating to npm when using the API or the npm command-line interface (CLI). An access token is a hexadecimal string that you can use to authenticate, and which gives you the right to install and/or publish your modules.

Notice: If you are logged in via `npm login` or`npm adduser`, you can save the `access token of the current login account by executing the` NuCM Save` instruction, save the current login account.

During the later use, various accounts can be quickly switched through the `nucm use <name>`, so that the NPM package is implemented with different accounts.

## Information

- [【教程】优秀前端人必须知道的 NPM 账号管理工具 - nucm](https://juejin.cn/post/7059224326674841636)

## LICENSE

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
