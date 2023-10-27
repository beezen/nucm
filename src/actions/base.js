import colors from "colors";
import { line, desensitize } from "../utils/index";
import { getLangMessage, getConfig, setConfig, getRegistryConfig, isEnabled } from "../common";
/**
 * 获取用户列表
 */
export function getUserList(options) {
  const config = getConfig(); // 基础配置
  const registryConfig = getRegistryConfig(config); // 源信息配置
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
    delete config.nucm.baseConfig;
    userList = Object.keys(config.nucm)
      .map(registryName => {
        return (
          `${colors.custom("【" + registryName + "】")}\n` + getListInfo(config.nucm[registryName])
        );
      })
      .join("\n\n");
  } else {
    userList = getListInfo(config.nucm[registryConfig.registryName]);
  }
  console.log(userList || defaultLog.red);
  return userList;
}

/** 变更用户 */
export function changeUser(name) {
  const config = getConfig(); // 基础配置
  const registryConfig = getRegistryConfig(config); // 源信息配置
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucm[registryConfig.registryName] || {};
  let npmrcConfig = config.npm;
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
  setConfig("nucm", config.nucm);
  setConfig("npm", npmrcConfig);
  console.log(`${getLangMessage("MSG_accountChanged")} ${name}`.green);
}

/** 添加用户 */
export function addUser(name, token) {
  const config = getConfig(); // 基础配置
  const registryConfig = getRegistryConfig(config); // 源信息配置
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucm[registryConfig.registryName] || {};
  !accountList[name] && (accountList[name] = {});
  accountList[name]["access-tokens"] = token;
  config.nucm[registryConfig.registryName] = accountList;
  setConfig("nucm", config.nucm);
  console.log(getLangMessage("MSG_accountAddSuccess").green);
}

/** 移除用户 */
export function removeUser(name) {
  const config = getConfig(); // 基础配置
  const registryConfig = getRegistryConfig(config); // 源信息配置
  if (!isEnabled(registryConfig)) return;
  let accountList = config.nucm[registryConfig.registryName] || {};
  if (!accountList[name]) {
    console.log(getLangMessage("MSG_accountRemoveFail").red);
    return;
  }
  delete accountList[name];
  setConfig("nucm", config.nucm);
  console.log(getLangMessage("MSG_accountRemoveSuccess").green);
}
