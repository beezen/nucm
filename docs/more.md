---
title: 了解更多...
---

# 了解更多

如果你恰好看到了这篇文章，你一定是希望对这个项目贡献自己的一份力量。

欢迎任何形式的贡献，不管是一个错别字的修改，还是一次友好的建议，不管是通过提交 [Issue](https://github.com/beezen/nucm/issues), 还是一个帅气 [pull request](https://github.com/beezen/nucm/pulls)。

## NPM auth related configuration

The settings `_auth`, `_authToken`, `username` and `_password` must all be scoped to a specific registry. This ensures that `npm` will never send credentials to the wrong host.

The full list is:

- `_auth` (base64 authentication string)
- `_authToken` (authentication token)
- `username`
- `_password`
- `email`
- `certfile` (path to certificate file)
- `keyfile` (path to key file)

## 参考链接

- [npmrc](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc)
- [about-access-tokens](https://docs.npmjs.com/about-access-tokens)
- [nrm](https://www.npmjs.com/package/nrm)
