module.exports = {
  base: "/nucm/",
  title: "NUCM",
  description:
    "NPM User Change Manager 是一款高效而直观的 NPM 账号切换管理工具，为开发者提供了简便的方法来轻松切换和管理不同的 NPM 用户账号。无论是在开发多个项目，协作开发，还是在不同的工作环境中切换，该工具都能帮助用户保持无缝的 NPM 包管理体验。",
  themeConfig: {
    repo: "https://github.com/beezen/nucm",
    repoLabel: "查看源码",
    sidebar: [
      "/",
      "/start",
      "/add",
      "/del",
      "/save",
      "/list",
      "/use",
      "/localize",
      "/update",
      "/registry",
      "/more"
    ],
    nav: [
      {
        text: "更新记录",
        link: "https://github.com/beezen/nucm/releases"
      }
    ]
  }
};
