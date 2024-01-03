# nucm -- npm 用户账号切换管理

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)
[![Coverage Status](https://coveralls.io/repos/github/beezen/nucm/badge.svg?branch=feature-action)](https://coveralls.io/github/beezen/nucm?branch=feature-action)

`nucm` 能帮你快速轻松地管理 NPM 账户信息。

[English](./README.md) | [简体中文](./README_CN.md)

## 安装

```bash
# 全局安装
$ npm install -g nucm # 或 yarn global add nucm
```

## 使用

```bash
Usage: nucm [options] [command]

Options:
  -v,--version                查看版本
  -h, --help                  显示命令帮助

Commands:
  ls [options]                查看账号列表
  use <name>                  切换账号
  add <name> <access-tokens>  添加账号
  del <name>                  移除账号
  localize <lang>             使用本地化语言
  update [options]            更新版本
  save                        保存当前账号
  help [command]              display help for command
```

## 详细参数说明

| 命令                        | 参数                       | 描述                                                                                                    |
| --------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| [ls](#查看当前源账号)       |                            | 查看当前源，账号列表                                                                                    |
| [ls](#查看当前源账号)       | `-l`                       | 查看当前源，账号详细信息                                                                                |
| [ls](#查看当前源账号)       | `-a`                       | 查看所有源，账号列表                                                                                    |
| [ls](#查看当前源账号)       | `-al`                      | 查看所有源，账号详细信息                                                                                |
| [use](#切换账号)            | `<name>`                   | 切换到指定账号。`<name>`：账号别名                                                                      |
| [add](#添加账号)            | `<name>` `<access-tokens>` | 添加账号。`<name>`：账号别名，`<access-tokens>`：[访问令牌](https://docs.npmjs.com/about-access-tokens) |
| [del](#移除账号)            | `<name>`                   | 删除账号。`<name>`：账号别名                                                                            |
| [localize](#使用本地化语言) | `<lang>`                   | 使用本地化语言。 `<lang>`：支持语言，目前仅支持： `cn`/`en`                                             |
| update                      |                            | 更新 cli 版本                                                                                           |
| [save](#保存账号)           |                            | 保存当前 npm 账号                                                                                       |

## 相关文章

- [【教程】优秀前端人必须知道的 NPM 账号管理工具 - nucm](https://juejin.cn/post/7059224326674841636)
- [【教程】NUCM（NPM 账号管理工具）新发布的这两个功能，你值得拥有](https://juejin.cn/post/7079411183408644104)

## 示例

### 保存账号

```bash
$ nucm save
```

### 添加账号

```bash
$ nucm add <name> <access-tokens>

  添加账号成功
```

### 移除账号

```bash
$ nucm del <name>

  移除账号成功
```

### 查看当前源账号

1、查看当前源，账号列表

```bash
$ nucm ls

  beezend -- abcdef......mno1
  beezen --- abcdef......mno2
* beeze ---- abcdef......mno3
```

2、查看当前源，账号详细信息

```bash
$ nucm ls -l

  beezend -- abcdefghijklmno1
  beezen --- abcdefghijklmno2
* beeze ---- abcdefghijklmno3
```

3、查看所有源，账号列表

```bash
$ nucm ls -a

【npm】
  beezend -- abcdef......mno1
  beezen --- abcdef......mno2
* beeze ---- abcdef......mno3

【maclocal】
* test ----- abcdef......mno4
```

4、查看所有源，账号详细信息

```bash
$ nucm ls -al

【npm】
  beezend -- abcdefghijklmno1
  beezen --- abcdefghijklmno2
* beeze ---- abcdefghijklmno3

【maclocal】
* test ----- abcdefghijklmno4
```

### 切换账号

```bash
$ nucm use beezen

  已切换到账号 beezen
```

### 使用本地化语言

```bash
$ nucm localize cn

  已切换到语言 cn
```

## 注意

我们管理的是 NPM 发布的[访问令牌](https://docs.npmjs.com/about-access-tokens)。

> 访问令牌是在使用 API 或 npm CLI (CLI)时，使用用户名和密码对 npm 进行身份验证的另一种选择。访问令牌是一个可用于身份验证的十六进制字符串，它赋予您安装和/或发布模块的权利。

注意：如果是通过 `npm login` 或者 `npm adduser` 进行登录的用户，可以通过执行 `nucm save` 指令，将当前登录账号的`访问令牌`进行保存。

在后期使用过程中，可以通过 `nucm use <name>` 的方式将各种账号的`访问令牌`快速切换，从而实现用不同账号对 npm 包进行发布。

## 许可证

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
