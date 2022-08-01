import ini from "ini";
import fs from "fs-extra";
import colors from "colors";
import {
  getLangMessage,
  line,
  desensitize,
  getConfig,
  getRegistryConfig,
  isEnabled
} from "../utils/index";
const config = getConfig(); // 基础配置
const registryConfig = getRegistryConfig(config); // 源信息配置

/**
 * 获取用户列表
 */
export function getUserList(options) {
  if (!isEnabled(registryConfig)) return;
  const defaultLog = getLangMessage("MSG_getUserListDefaultLog");
  let userList = "";
  const getListInfo = function(accountList = {}) {
    return Object.keys(accountList)
      .map(key => {
        let visibleToken = options.list
          ? accountList[key]["access-tokens"]
          : desensitize(accountList[key]["access-tokens"]); // 脱敏处理
        if (accountList[key]["is-current"]) {
          return colors.green(`* ${key} ${line(key, 20)} ${visibleToken}`);
        }
        return `  ${key} ${line(key, 20)} ${visibleToken}`;
      })
      .join("\n");
  };
  if (options.all) {
    colors.setTheme({
      custom: ["black", "bgBrightGreen"]
    });
    delete config.nucmrcConfig.baseConfig;
    userList = Object.keys(config.nucmrcConfig)
      .map(registryName => {
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
  return userList;
}

/** 变更用户 */
export function changeUser(name) {
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucmrcConfig[registryConfig.registryName] || {};
  let npmrcConfig = config.npmrcConfig;
  if (!accountList[name]) {
    console.log(getLangMessage("MSG_accountNotFound").red);
    return;
  }
  npmrcConfig[`${registryConfig.registry.replace(/^https?:/, "")}:_authToken`] =
    accountList[name]["access-tokens"];
  Object.keys(accountList).forEach(key => {
    if (accountList[key]["is-current"]) {
      delete accountList[key]["is-current"];
    }
  });
  accountList[name]["is-current"] = true;
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  fs.writeFileSync(config.npmrc_path, ini.stringify(npmrcConfig));
  console.log(`${getLangMessage("MSG_accountChanged")} ${name}`.green);
}

/** 添加用户 */
export function addUser(name, token) {
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucmrcConfig[registryConfig.registryName] || {};
  !accountList[name] && (accountList[name] = {});
  accountList[name]["access-tokens"] = token;
  config.nucmrcConfig[registryConfig.registryName] = accountList;
  fs.writeFileSync(config.nucmrc_path, ini.stringify({ ...config.nucmrcConfig }));
  console.log(getLangMessage("MSG_accountAddSuccess").green);
}

/** 移除用户 */
export function removeUser(name) {
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
