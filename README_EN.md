# nucm -- Npm User Change Manager

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)
[![Coverage Status](https://coveralls.io/repos/github/beezen/nucm/badge.svg?branch=feature-action)](https://coveralls.io/github/beezen/nucm?branch=feature-action)

The full name of NUCM is NPM User Change Manager, an efficient and intuitive tool for managing NPM account switches. It provides developers with a straightforward way to easily switch and manage different NPM user accounts. Whether working on multiple projects, collaborating with others, or switching between different work environments, this tool helps users maintain a seamless NPM package management experience.

[English](./README.md) | [简体中文](./README_CN.md)

## Table of Contents

1. [Detailed Documentation](https://beezen.github.io/nucm/)
2. [Learning Resources](#learning-resources)
3. [Quick Start](#quick-start)
4. [Simple Examples](#simple-examples)
5. [Considerations](#considerations)

## Learning Resources

- [【教程】优秀前端人必须知道的 NPM 账号管理工具 - nucm](https://juejin.cn/post/7059224326674841636)
- [【教程】NUCM（NPM 账号管理工具）新发布的这两个功能，你值得拥有](https://juejin.cn/post/7079411183408644104)

## Quick Start

### Installation

```bash
$ npm install -g nucm # or yarn global add nucm
```

### Available Commands

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
  localize|language <lang>    use localized languages
  update [options]            updated version
  save                        Save the current account
  help [command]              display help for command
```

## Simple Examples

### Save Account

```bash
$ nucm save
```

### Add Account

```bash
$ nucm add beezen abcdefXXXXXXXXmno2

  Account added successfully
```

### View Current Source Account

```bash
$ nucm ls

  beezend -- abcdef......mno1
  beezen --- abcdef......mno2
* beeze ---- abcdef......mno3
```

### Switch Account

```bash
$ nucm use beezen

  Switched to account beezen
```

## Considerations

We manage the [Access Token](https://docs.npmjs.com/about-access-tokens) released by NPM.

> An access token is an alternative to using your username and password for authenticating to npm when using the API or the npm command-line interface (CLI). An access token is a hexadecimal string that you can use to authenticate, and which gives you the right to install and/or publish your modules.

Note: If you have logged in through npm login or npm adduser, you can preserve the access token of the current login account by executing the nucm save command.

During subsequent use, you can swiftly switch between accounts using the nucm use <name> command, enabling quick switching of the associated Access Token. This allows seamless release of NPM packages with different account credentials.

## LICENSE

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
