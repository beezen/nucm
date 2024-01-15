---
title: nucm registry 镜像源操作
---

# 镜像源操作

通过 NUCM 可以轻松管理 NPM 的镜像源，实现快速切换能力。

## 命令

```bash
$ nucm registry <cmd...>
```

## `cmd...` 变长参数

### `ls`

查看镜像源列表。

### `add <name> <url>`

添加镜像源和别名。

`name`

- Default: null
- Required: true

镜像源的别名

`url`

- Default: null
- Required: true

镜像源的地址

### `use <name>`

切换当前镜像源。

`name`

- Default: null
- Required: true

镜像源的别名

### `del <name>`

删除指定镜像源。

`name`

- Default: null
- Required: true

镜像源的别名

## 详细

1、查看当前镜像源列表

```bash
$ nucm registry ls

  npm ----------------------- https://registry.npmjs.org/
  yarn ---------------------- https://registry.yarnpkg.com/
  tencent ------------------- https://mirrors.cloud.tencent.com/npm/
  cnpm ---------------------- https://r.cnpmjs.org/
* taobao -------------------- https://registry.npmmirror.com/
  npmMirror ----------------- https://skimdb.npmjs.com/registry/
```

2、添加新的镜像源配置

```bash
$ nucm registry add testRegistry https://xxx.registry.com/
```

3、切换当前使用镜像源

```bash
$ nucm registry use testRegistry

SUCCESS  The registry has been changed to 'testRegistry'.
```

4、删除指定镜像源

```bash
$ nucm registry del testRegistry

SUCCESS  The registry 'testRegistry' has been deleted successfully.
```

## 使用 NRM 管理镜像源

NUCM 工具默认内置了 NRM 模块，以便更便捷地管理 NPM 镜像源。开发者执行的 `nucm registry <cmd...>` 命令会被自动代理到 `nrm <cmd...>` 命令。有关 `<cmd...> `的详细指令，请参考 [NRM 使用文档](https://www.npmjs.com/package/nrm)。

如果您已经在本地安装了 nrm 工具，可以继续使用它，而不会与 nucm 工具发生冲突。
