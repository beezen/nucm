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
  update [options]            updated version
  save                        Save the current account
  help [command]              display help for command
```

## Detailed parameter description

| command                                | options                    | description                                                                                                        |
| -------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [ls](#view-the-current-source-account) |                            | View the current source, account list                                                                              |
| [ls](#view-the-current-source-account) | `-l`                       | View the current source, account details                                                                           |
| [ls](#view-the-current-source-account) | `-a`                       | View all sources, account lists                                                                                    |
| [ls](#view-the-current-source-account) | `-al`                      | View all sources, account details                                                                                  |
| [use](#switch-account)                 | `<name>`                   | Switch to the specified account.`<name>`: Account alias                                                            |
| [add](#add-account)                    | `<name>` `<access-tokens>` | Add account.`<name>`: Account alias，`<access-tokens>`：[Access Token](https://docs.npmjs.com/about-access-tokens) |
| [del](#remove-the-account)             | `<name>`                   | Delete account.`<name>`: Account alias                                                                             |
| [localize](#use-localized-language)    | `<lang>`                   | Use localized language. `<lang>`Support language, currently only supports: `cn`/`en`                               |
| update                                 |                            | Update CLI version                                                                                                 |
| [save](#save-account)                  |                            | Save the current account                                                                                           |

## Information

- [【教程】优秀前端人必须知道的 NPM 账号管理工具 - nucm](https://juejin.cn/post/7059224326674841636)
- [【教程】NUCM（NPM 账号管理工具）新发布的这两个功能，你值得拥有](https://juejin.cn/post/7079411183408644104)

## Example

### Save account

```bash
$ nucm save
```

### Add account

```bash
$ nucm add <name> <access-tokens>

  Add account success
```

### Remove the account

```bash
$ nucm del <name>

  Remove account success
```

### View the current source account

1. View the current source, account list

```bash
$ nucm ls

  beezend -- abcdef......mno1
  beezen --- abcdef......mno2
* beeze ---- abcdef......mno3
```

2. View the current source, account details

```bash
$ nucm ls -l

  beezend -- abcdefghijklmno1
  beezen --- abcdefghijklmno2
* beeze ---- abcdefghijklmno3
```

3. View all sources, account lists

```bash
$ nucm ls -a

【npm】
  beezend -- abcdef......mno1
  beezen --- abcdef......mno2
* beeze ---- abcdef......mno3

【maclocal】
* test ----- abcdef......mno4
```

4. View all sources, account details

```bash
$ nucm ls -al

【npm】
  beezend -- abcdefghijklmno1
  beezen --- abcdefghijklmno2
* beeze ---- abcdefghijklmno3

【maclocal】
* test ----- abcdefghijklmno4
```

### Switch account

```bash
$ nucm use beezen

  The account has been switched to beezen
```

### Use localized language

```bash
$ nucm localize cn

  Switched to language cn
```

## Notice

We manage the [Access Token](https://docs.npmjs.com/about-access-tokens) released by NPM.

> An access token is an alternative to using your username and password for authenticating to npm when using the API or the npm command-line interface (CLI). An access token is a hexadecimal string that you can use to authenticate, and which gives you the right to install and/or publish your modules.

Notice: If you are logged in via `npm login` or`npm adduser`, you can save the `access token of the current login account by executing the` NuCM Save` instruction, save the current login account.

In the later use process, you can quickly switch the `nucm use <name>` to quickly switch to the `Access Token`, so as to realize the release of the NPM package with different account numbers.

## LICENSE

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
