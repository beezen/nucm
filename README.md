# nucm -- Npm User Change Manager

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)

`nucm` can help you manage NPM account information quickly and easily。Now only NPM source information is managed。

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

已切换到账号 beezen
```

```bash
$ nucm add <name> <token> # 添加新账号
$ nucm del <name>  # 移除账号
```

## Usage

```bash
Usage: nucm [options] [command]

Options:
  -v,--version        查看版本
  -h, --help          display help for command

Commands:
  ls                  show version（查看用户列表）
  use <name>          switch account（切换账号）
  add <name> <token>  add account（添加账号）
  del <name>          remove account（移除账号）
  help [command]      display help for command
```

## Notice

For the time being, we only manage the accounts of the NPM source。We only manage Access Tokens published by NPM。

## LICENSE

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
