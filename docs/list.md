---
title: nucm ls 查看账号
---

# 查看账号

轻松查看本地已添加的账号列表信息。

## 命令

```bash
$ nucm ls [options]
```

## 参数

- `options`：可选参数

| 选项          | 描述                           |
| ------------- | ------------------------------ |
| `-l`,`--list` | 明文显示账号详细信息           |
| `-a`,`--all`  | 脱敏显示所有注册源下的账号列表 |

## 示例

1、仅查看当前源下的账号列表，且账号都脱敏显示

```bash
$ nucm ls

【taobao】
* test01 ------------- ......56789
```

2、仅查看当前源下的账号列表，且账号都完整显示（请注意保护自己的账号）

```bash
$ nucm ls -l #或 --list

【taobao】
* test01 ------------- 123456789
```

3、查看所有注册源下的账号列表，且账号都脱敏显示

```bash
$ nucm ls -a #或 --all

【npm】
* test01 ------------- ......56789

【cnpm】
* test01 ------------- ......56789

【artifactory】
* test01 ------------- ......56789
```

4、查看所有注册源下的账号列表，且账号都完整显示（请注意保护自己的账号）

```bash
$ nucm ls -al #或 --all --list

【npm】
* test01 ------------- 123456789

【cnpm】
* test01 ------------- 123456789

【artifactory】
* test01 ------------- 123456789
```
