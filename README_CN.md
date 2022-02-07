# nucm -- npm 用户切换管理

[![NPM version][npm-image]][npm-url]
![](https://img.shields.io/badge/build-passing-green)

`nucm` 能帮你快速轻松地管理 NPM 账户信息。目前只对 NPM 源信息进行管理。

[English](./README.md) | [简体中文](./README_CN.md)

## 安装

```bash
$ npm install -g nucm
```

## 示例

```bash
$ nucm ls

  beezend -- xxxxxx......xxxx
  beezen --- xxxxxx......xxxx
* beeze ---- xxxxxx......xxxx

$ nucm ls -l

  beezend -- xxxxxxxxxxxxxxxx
  beezen --- xxxxxxxxxxxxxxxx
* beeze ---- xxxxxxxxxxxxxxxx
```

```bash
$ nucm use beezen

已切换到账号 beezen
```

```bash
$ nucm localize cn

已切换到语言 cn
```

```bash
$ nucm add <name> <access-tokens> # 添加新账号
$ nucm del <name>  # 移除账号
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
  install                     初始化
  update [options]            更新版本
  help [command]              display help for command
```

## 注意

目前，我们只管理 NPM 源的账号。我们管理的是 NPM 发布的[访问令牌](https://docs.npmjs.com/about-access-tokens)。

> 访问令牌是在使用 API 或 npm CLI (CLI)时，使用用户名和密码对 npm 进行身份验证的另一种选择。访问令牌是一个可用于身份验证的十六进制字符串，它赋予您安装和/或发布模块的权利。

## 学习资料

- [【教程】优秀前端人必须知道的 NPM 账号管理工具 - nucm](https://juejin.cn/post/7059224326674841636)

## 许可证

MIT

[npm-url]: https://www.npmjs.com/package/nucm
[npm-image]: https://img.shields.io/npm/v/nucm.svg
