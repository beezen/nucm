const ini = require("ini");
const fs = require("fs-extra");
const colors = require("colors");
const shell = require("shelljs");
var inquirer = require("inquirer");
const pkg = require("../../package.json");
const { getLangMessage, compareVersion } = require("../utils/index");
const { getConfig } = require("../index");
/** 初始化 */
function initInstall() {
  const config = getConfig();
  const defaultBaseConfig = {
    lang: "en",
    checkUpdateDate: Date.now()
  };
  config.nucmrcConfig.baseConfig = { ...defaultBaseConfig, ...config.baseConfig };
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  console.log(getLangMessage("MSG_initSuccess").green);
}

/**
 * 更新版本
 * @param 是否自动校验
 */
function updateVersion(option) {
  const curVersion = pkg.version;
  const latestVersion = shell.exec("npm view nucm version", { silent: true }).stdout.trim();
  if (!curVersion || !latestVersion) return;
  const status = compareVersion(curVersion, latestVersion);
  if (status === -1) {
    // 存在新版本
    let message = `${getLangMessage("MSG_updateTips")}\n🌟 nucm  ${curVersion.green}  →  ${
      latestVersion.red
    }`;

    inquirer
      .prompt([
        {
          type: "confirm",
          message,
          name: "result"
        }
      ])
      .then((answers) => {
        if (answers.result) {
          shell.exec("npm install -g nucm@latest"); // 更新最新版本
        }
      });
  } else {
    // 当前已是最新版本
    if (option.silent) return;
    console.log(getLangMessage("MSG_updateLatest").green);
  }
}

module.exports = {
  initInstall,
  updateVersion
};
