---
title: nucm use 切换账号
---

# 切换账号

方便地切换本地管理的账号。

## 命令

```bash
$ nucm use [options] <name>
```

## 参数

- `name`：账号别名。根据账号别名进行 Access Tokens 账号的切换。
- `options`：可选参数

| 选项                         | 描述                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-t <type>`, `--type <type>` | 用于标识切换账号的方式：`authToken` or `auth`，默认值为 `authToken` 。<br/>`authToken`，代表 `//registry.xx.com/:_authToken=xxx` 形式。<br/>`auth` 代表 `//registry.xx.com/:_auth=xxx` 形式。<br/> |

## 示例

1、切换账号

```bash
$ nucm use test01

已切换到账号 test01

# .npmrc 文件中显示如下 //registry.npmmirror.com/:_authToken=123456789
```

2、以 `_auth` 形式切换账号

```bash
$ nucm use test01 --type=auth

已切换到账号 test01

# .npmrc 文件中显示如下 //registry.npmmirror.com/:_auth=123456789
```
