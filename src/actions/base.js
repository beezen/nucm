import colors from "colors";
import { line, desensitize } from "../utils/index";
import { getLangMessage, setConfig } from "../common";
import { baseInitConfig } from "../common/env";
/**
 * 获取用户列表
 */
export function getUserList(options) {
  const { fileConfig, registryConfig } = baseInitConfig;
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
  const nucmrcConfig = fileConfig.nucm;
  if (options.all) {
    colors.setTheme({
      custom: ["black", "bgBrightGreen"]
    });
    delete nucmrcConfig.baseConfig;
    userList = Object.keys(nucmrcConfig)
      .map(registryName => {
        return (
          `${colors.custom("【" + registryName + "】")}\n` + getListInfo(nucmrcConfig[registryName])
        );
      })
      .join("\n\n");
  } else {
    userList = getListInfo(nucmrcConfig[registryConfig.registryName]);
  }
  console.log(userList || defaultLog.red);
  return userList;
}

/** 变更用户 */
export function changeUser(name) {
  const { fileConfig, registryConfig } = baseInitConfig;
  let npmrcConfig = fileConfig.npm;
  let nucmrcConfig = fileConfig.nucm;
  let accountList = nucmrcConfig[registryConfig.registryName] || {};
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
  setConfig("nucm", nucmrcConfig);
  setConfig("npm", npmrcConfig);
  console.log(`${getLangMessage("MSG_accountChanged")} ${name}`.green);
}

/** 添加用户 */
export function addUser(name, token) {
  const { fileConfig, registryConfig } = baseInitConfig;
  const nucmrcConfig = fileConfig.nucm;
  let accountList = nucmrcConfig[registryConfig.registryName] || {};
  !accountList[name] && (accountList[name] = {});
  accountList[name]["access-tokens"] = token;
  nucmrcConfig[registryConfig.registryName] = accountList;
  setConfig("nucm", nucmrcConfig);
  console.log(getLangMessage("MSG_accountAddSuccess").green);
}

/** 移除用户 */
export function removeUser(name) {
  const { fileConfig, registryConfig } = baseInitConfig;
  const nucmrcConfig = fileConfig.nucm;
  let accountList = nucmrcConfig[registryConfig.registryName] || {};
  if (!accountList[name]) {
    console.log(getLangMessage("MSG_accountRemoveFail").red);
    return;
  }
  delete accountList[name];
  setConfig("nucm", nucmrcConfig);
  console.log(getLangMessage("MSG_accountRemoveSuccess").green);
}
