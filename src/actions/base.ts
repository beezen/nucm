import { line, desensitize, printLog } from "../utils/index";
import { setConfig } from "../common";
import { baseInitConfig } from "../common/env";

const colors = require("colors");
interface LOptions {
  list?: boolean;
  all?: boolean;
}

// 账号类型配置 _authToken|_auth|_password
interface AuthOptions {
  type?: "auth";
}

/**
 * 获取用户列表
 */
export function getUserList(options: LOptions) {
  const { fileConfig, registryConfig } = baseInitConfig;
  const defaultLog = printLog("account.noData", { isPrint: false, type: "error" });
  let userList = "";
  const getListInfo = function (accountList = {}) {
    return Object.keys(accountList)
      .map((key) => {
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
  colors.setTheme({
    custom: ["black", "bgBrightYellow"]
  });
  if (options.all) {
    const { baseConfig, ...accountConfig } = nucmrcConfig;
    userList = Object.keys(accountConfig)
      .map((registryName) => {
        let registryNameStr =
          registryName === registryConfig.registryName
            ? // @ts-ignore
              colors.custom(`【${registryName}】`)
            : `【${registryName}】`;
        return `${registryNameStr}\n${getListInfo(accountConfig[registryName])}`;
      })
      .join("\n\n");
    printLog(userList);
  } else {
    const listStr = getListInfo(nucmrcConfig[registryConfig.registryName]);
    // @ts-ignore
    userList = `${colors.custom(`【${registryConfig.registryName}】`)}\n${listStr}`;
    printLog(listStr ? userList : defaultLog);
  }
  return userList;
}

/** 变更用户 */
export function changeUser(name: string, options?: AuthOptions) {
  const { fileConfig, registryConfig } = baseInitConfig;
  let npmrcConfig = fileConfig.npm;
  let nucmrcConfig = fileConfig.nucm;
  let accountList = nucmrcConfig[registryConfig.registryName] || {};
  if (!accountList[name]) {
    printLog("account.notFound", { type: "error" });
    return;
  }
  let authStr = "_authToken";
  if (["auth", "authToken"].includes(options?.type)) {
    authStr = `_${options.type}`;
  }
  npmrcConfig[`${registryConfig.registry.replace(/^https?:/, "")}:${authStr}`] =
    accountList[name]["access-tokens"];
  Object.keys(accountList).forEach((key) => {
    if (accountList[key]["is-current"]) {
      delete accountList[key]["is-current"];
    }
  });
  accountList[name]["is-current"] = true;
  setConfig("nucm", nucmrcConfig);
  setConfig("npm", npmrcConfig);
  printLog("account.changed", { type: "info", data: { name } });
}

/** 添加用户 */
export function addUser(name: string, token: string) {
  const { fileConfig, registryConfig } = baseInitConfig;
  const nucmrcConfig = fileConfig.nucm;
  let accountList = nucmrcConfig[registryConfig.registryName] || {};
  !accountList[name] && (accountList[name] = {});
  accountList[name]["access-tokens"] = token;
  nucmrcConfig[registryConfig.registryName] = accountList;
  setConfig("nucm", nucmrcConfig);
  printLog("account.addSuccess", { type: "info" });
  if (Object.keys(accountList).length === 1) {
    // 判断当前是否只有唯一账号
    changeUser(name);
  }
}

/** 移除用户 */
export function removeUser(name: string) {
  const { fileConfig, registryConfig } = baseInitConfig;
  const nucmrcConfig = fileConfig.nucm;
  let accountList = nucmrcConfig[registryConfig.registryName] || {};
  if (!accountList[name]) {
    printLog("account.removeFail", { type: "error" });
    return;
  }
  delete accountList[name];
  setConfig("nucm", nucmrcConfig);
  printLog("account.removeSuccess", { type: "info" });
}
