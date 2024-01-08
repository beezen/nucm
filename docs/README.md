---
title: 介绍
---

# 介绍

NUCM 的全称为 NPM User Change Manager，中文译为 NPM 用户账号的切换管理，它可以帮助开发者在本地环境进行 NPM 账号管理，方便开发者快速切换账号，并向不同的注册源发布 NPM 包。

什么人正在使用 NUCM 工具？

- 经常忘记 NPM 账号和密码的人
- 有多个 NPM 账号需要频繁切换的人

NUCM 是一个基于 NPM 的 Access Tokens 机制进行账号切换管理的工具，它的使用步骤很简单：

1、添加账号

```bash
$ nucm add test1 abcdefghijkl111 # 添加 test1 账号

$ nucm add test2 abcdefghijkl222 # 添加 test2 账号
```

2、切换账号

```bash
$ nucm use test2  # 切换 test2 账号
```

接下来我们就可以用 test2 账号进行 NPM 包发布了。[开始使用](/start.html)
