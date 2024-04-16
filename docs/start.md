---
title: 快速开始
---

# 快速开始

## 安装

使用您喜欢的包管理器安装 `nucm`：

```bash
$ npm install -g nucm

# 或使用 yarn
$ yarn global add nucm
```

## 常用命令

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

## 操作步骤

### 1、添加账号

执行 `nucm add <name> <access-tokens>` 添加账号， `name` 为自定义的账号别名，`access-tokens` 为 NPM 账号令牌。例如：

```bash
$ nucm add beezen xxxxxxxxxxxxxxxx

添加账号成功
```

[点击查看 access-tokens 获取方式](more.html#npm-auth-related-configuration)

### 2、查看账号列表

执行 `nucm ls` 可查看刚添加的账号是否出现在账号列表中。例如：

```bash
# 默认显示脱敏的
$ nucm ls

  beezend -- xxxxxx......xxxx
  beezen --- xxxxxx......xxxx
* beeze ---- xxxxxx......xxxx

# 显示详细列表
$ nucm ls -l # 或 nucm ls --list

  beezend -- xxxxxxxxxxxxxxxxxxxxxxx
  beezen --- xxxxxxxxxxxxxxxxxxxxxxx
* beeze ---- xxxxxxxxxxxxxxxxxxxxxxx
```

### 3、切换账号

执行 `nucm use <name>` 命令切换当前使用账号。例如：

```bash
$ nucm use beezen

已切换到账号 beezen
```

### 4、发布 NPM 包

在对应的 NPM 包根目录下执行 `npm publish`，则会使用第 3 步中账号的 Access Tokens 进行 NPM 包发布。

```bash
$ npm publish # 用切换的当前账号进行发布
```
