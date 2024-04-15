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

`options`

- Default: null, 可选参数：`'-t'`
- Required: false

配置参数，`-t` 用于标识切换账号的方式，可选值为 `authToken`(默认) | `auth`。

`name`

- Default: null
- Required: true

账号别名。根据账号别名进行 Access Tokens 账号的切换。
