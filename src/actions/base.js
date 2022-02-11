const ini = require("ini");
const fs = require("fs-extra");
const colors = require("colors");
const {
  getLangMessage,
  line,
  desensitize,
  getConfig,
  getRegistryConfig,
  isEnabled
} = require("../utils/index");
const config = getConfig(); // 基础配置
const registryConfig = getRegistryConfig(); // 源信息配置

/**
 * 获取用户列表
 */
function getUserList(options) {
  if (!isEnabled(registryConfig)) return;
  const defaultLog = getLangMessage("MSG_getUserListDefaultLog");
  let userList = "";
  const getListInfo = function (accountList = {}) {
    return Object.keys(accountList)
      .map((key) => {
        let visibleToken = options.list
          ? accountList[key]["access-tokens"]
          : desensitize(accountList[key]["access-tokens"]); // 脱敏处理
        if (accountList[key]["is-current"]) {
          return colors.green(`* ${key} ${line(key, 10)} ${visibleToken}`);
        }
        return `  ${key} ${line(key, 10)} ${visibleToken}`;
      })
      .join("\n");
  };
  if (options.all) {
    colors.setTheme({
      custom: ["black", "bgBrightGreen"]
    });
    delete config.nucmrcConfig.baseConfig;
    userList = Object.keys(config.nucmrcConfig)
      .map((registryName) => {
        return (
          `${colors.custom("【" + registryName + "】")}\n` +
          getListInfo(config.nucmrcConfig[registryName])
        );
      })
      .join("\n\n");
  } else {
    userList = getListInfo(config.nucmrcConfig[registryConfig.registryName]);
  }
  console.log(userList || defaultLog.red);
}

/** 变更用户 */
function changeUser(name) {
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucmrcConfig[registryConfig.registryName] || {};
  let npmrcConfig = config.npmrcConfig;
  if (!accountList[name]) {
    console.log(getLangMessage("MSG_accountNotFound").red);
    return;
  }
  let currentRegistryAuthentication =
    npmrcConfig[`${registryConfig.registry.replace(/^https?:/, "")}:_authToken`];
  if (currentRegistryAuthentication) {
    npmrcConfig[`${registryConfig.registry.replace(/^https?:/, "")}:_authToken`] =
      accountList[name]["access-tokens"];
    Object.keys(accountList).forEach((key) => {
      if (accountList[key]["is-current"]) {
        delete accountList[key]["is-current"];
      }
    });
    accountList[name]["is-current"] = true;
    fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
    fs.writeFileSync(config.npmrc_path, ini.stringify(npmrcConfig));
    console.log(`${getLangMessage("MSG_accountChanged")} ${name}`.green); // The account has been switched to
  }
}

/** 添加用户 */
function addUser(name, token) {
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucmrcConfig[registryConfig.registryName] || {};
  !accountList[name] && (accountList[name] = {});
  accountList[name]["access-tokens"] = token;
  config.nucmrcConfig[registryConfig.registryName] = accountList;
  fs.writeFileSync(config.nucmrc_path, ini.stringify({ ...config.nucmrcConfig }));
  console.log(getLangMessage("MSG_accountAddSuccess").green);
}

/** 移除用户 */
function removeUser(name) {
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucmrcConfig[registryConfig.registryName] || {};
  if (!accountList[name]) {
    console.log(getLangMessage("MSG_accountRemoveFail").red);
    return;
  }
  delete accountList[name];
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  console.log(getLangMessage("MSG_accountRemoveSuccess").green);
}

module.exports = {
  getUserList,
  changeUser,
  addUser,
  removeUser
};
