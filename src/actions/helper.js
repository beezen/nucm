const colors = require("colors");
const ini = require("ini");
const shell = require("shelljs");
var inquirer = require("inquirer");
const fs = require("fs-extra");
const pkg = require("../../package.json");
const { getLangMessage, compareVersion, getConfig, getRegistryConfig } = require("../utils/index");
const { addUser, removeUser } = require("./base");
/**
 * 更新版本
 * @param 是否自动校验
 */
function updateVersion(option) {
  const config = getConfig();
  config.baseConfig.checkUpdateDate = Date.now();
  fs.writeFile(config.nucmrc_path, ini.stringify(config.nucmrcConfig)); // 更新校验时间
  const curVersion = pkg.version;
  const latestVersion = shell
    .exec("npm view nucm version --registry='https://registry.npmjs.org/'", { silent: true })
    .stdout.trim();
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
      .then(answers => {
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

/** 切换语言 */
function changeLang(language) {
  const config = getConfig();
  let baseConfig = config.baseConfig;
  if (["en", "cn"].includes(language)) {
    baseConfig.lang = language;
    fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
    console.log(`${getLangMessage("MSG_langChanged")} ${language}`.green);
  } else {
    console.log(getLangMessage("MSG_changeLang").red);
  }
}

/** 查询当前 token 信息，并存储 */
function searchToSave() {
  const config = getConfig();
  const registryConfig = getRegistryConfig(config);
  if (!registryConfig._authtoken) {
    console.log(getLangMessage("MSG_save_04").red);
    return;
  }
  const nucmrcConfig = config.nucmrcConfig;
  const accountList = nucmrcConfig[registryConfig.registryName] || {};
  const account = Object.keys(accountList).filter(
    name => accountList[name] && accountList[name]["access-tokens"] === registryConfig._authtoken
  );
  const tokenTag = `nucm_${Date.now()}`;

  if (account.length > 0) {
    inquirer
      .prompt([
        {
          type: "confirm",
          message: getLangMessage("MSG_save_01"),
          name: "check"
        }
      ])
      .then(answers => {
        if (answers.check) {
          inquirer
            .prompt([
              {
                type: "input",
                message: getLangMessage("MSG_save_02"),
                name: "name",
                default: tokenTag
              }
            ])
            .then(a => {
              if (a.name) {
                removeUser(account[0]);
                addUser(a.name, registryConfig._authtoken);
              }
            });
        }
      });
  } else {
    inquirer
      .prompt([
        {
          type: "input",
          message: getLangMessage("MSG_save_03"),
          name: "name",
          default: tokenTag
        }
      ])
      .then(answers => {
        if (answers.name) {
          addUser(answers.name, registryConfig._authtoken);
        }
      });
  }
}

module.exports = {
  updateVersion,
  changeLang,
  searchToSave
};
