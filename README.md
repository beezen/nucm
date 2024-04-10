# NUCM -- NPM 用户账号切换管理

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)
[![Coverage Status](https://coveralls.io/repos/github/beezen/nucm/badge.svg?branch=feature-action)](https://coveralls.io/github/beezen/nucm?branch=feature-action)

NUCM 的全称为 NPM User Change Manager，是一款高效而直观的 NPM 账号切换管理工具，为开发者提供了简便的方法来轻松切换和管理不同的 NPM 用户账号。无论是在开发多个项目，协作开发，还是在不同的工作环境中切换，该工具都能帮助用户保持无缝的 NPM 包管理体验。

[简体中文](./README.md) | [English](./README_EN.md)

## 目录

1. [详细文档](https://beezen.github.io/nucm/)
2. [学习资料](#学习资料)
3. [快速开始](#快速开始)
4. [简单示例](#简单示例)
5. [注意事项](#注意事项)

## 详细文档

文档地址：[https://beezen.github.io/nucm/](https://beezen.github.io/nucm/)

## 学习资料

- [【教程】优秀前端人必须知道的 NPM 账号管理工具 - nucm](https://juejin.cn/post/7059224326674841636)
- [【教程】NUCM（NPM 账号管理工具）新发布的这两个功能，你值得拥有](https://juejin.cn/post/7079411183408644104)

## 快速开始

### 安装

```bash
# 全局安装
$ npm install -g nucm # 或 yarn global add nucm
```

### 可用命令

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
  registry|nrm <cmd...>       注册源配置
  help [command]              display help for command
```

## 简单示例

### 保存账号

```bash
$ nucm save
```

### 添加账号

```bash
$ nucm add beezen abcdefXXXXXXXXmno2

  添加账号成功
```

### 查看当前源账号

```bash
$ nucm ls

  beezend -- abcdef......mno1
  beezen --- abcdef......mno2
* beeze ---- abcdef......mno3
```

### 切换账号

```bash
$ nucm use beezen

  已切换到账号 beezen
```

## 注意事项

我们管理的是 NPM 发布的[访问令牌](https://docs.npmjs.com/about-access-tokens)。

> 访问令牌是使用 API 或 npm CLI (CLI) 时，对 npm 进行身份验证的另一种选择。它是一个十六进制字符串，可用于身份验证，并授予您安装和/或发布模块的权限。

请注意：如果您是通过 `npm login` 或者 `npm adduser` 进行登录的用户，可以使用 nucm save 命令将当前登录账号的访问令牌保存起来。

在后续的使用过程中，您可以通过 `nucm use <name>` 的方式快速切换各种账号的访问令牌，从而实现对 npm 包使用不同账号进行发布。

如果想进一步了解 NPM 登录相关的配置，可以参考[.npmrc 配置说明](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc#auth-related-configuration)。

## 许可证

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
