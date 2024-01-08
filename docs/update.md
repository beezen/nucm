---
title: nucm update 更新版本
---

# 更新版本

轻松将工具版本更新到最新。

## 命令

```bash
$ nucm update [options]
```

## 配置

`options`

- Default: null。可选参数：`'--silent'`
- Required: false

`options` 表示更新版本的详细配置参数。它为空时，表示询问式更新方式；它为 '--silent' 时，表示静默更新方式。

## 详细

询问式更新。检查最新的工具版本，并询问是否需要更新。

```bash
$ nucm update

更新检查中......
? 存在可更新的版本。
🌟 nucm  1.8.0  →  1.8.7 (Y/n)
```

静默更新。检测到可更新版本时，会自动更新到最新，适用于自动化 CI/CD 流程。

```bash
$ nucm update --silent
```
