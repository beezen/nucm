import "colors";
import shell from "shelljs";
import inquirer from "inquirer";
import { changeLanguage } from "i18next";
import { setConfig } from "../common";
import { baseInitConfig } from "../common/env";
import { compareVersion, getPackageManager, printLog } from "../utils/index";
import { addUser, removeUser } from "./base";
/**
 * 更新版本
 * @param option 配置
 * @param curVersion 当前版本号
 */
export function updateVersion(option, curVersion) {
  const { fileConfig } = baseInitConfig;
  const nucmrcConfig = fileConfig.nucm;
  let baseConfig = nucmrcConfig?.baseConfig;
  !baseConfig && (baseConfig = nucmrcConfig.baseConfig = {});
  baseConfig.checkUpdateDate = Date.now();
  setConfig("nucm", nucmrcConfig); // 更新校验时间记录
  printLog("MSG_update01", { type: "info" });
  const latestVersion = shell.exec("npm view nucm version", { silent: true }).stdout.trim();
  if (!curVersion || !latestVersion) {
    printLog("MSG_update02", { type: "error" });
    return;
  }
  const status = compareVersion(curVersion, latestVersion);
  if (status === -1) {
    const packageManager = getPackageManager();
    const updateCmd =
      packageManager === "yarn" ? "yarn global add nucm@latest" : "npm install -g nucm@latest";
    if (option.silent) {
      printLog("MSG_updateTips", { type: "error" });
      shell.exec(updateCmd); // 更新最新版本
      return;
    }
    // 存在新版本
    let message = `${printLog("MSG_updateTips", { type: "error", isPrint: false })}\n🌟 nucm  ${
      curVersion.green
    }  →  ${latestVersion.red}`;

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
          shell.exec(updateCmd); // 更新最新版本
        }
      });
  } else {
    // 当前已是最新版本
    if (option.silent) return;
    printLog("MSG_updateLatest", { type: "info" });
  }
}

/** 切换语言 */
export function changeLang(language) {
  const { fileConfig } = baseInitConfig;
  const nucmrcConfig = fileConfig.nucm;
  let baseConfig = nucmrcConfig?.baseConfig;
  !baseConfig && (baseConfig = nucmrcConfig.baseConfig = {});
  if (["en", "cn"].includes(language)) {
    baseConfig.lang = language;
    setConfig("nucm", nucmrcConfig);
    changeLanguage(language);
    printLog("MSG_langChanged", { type: "info", data: { language } });
  } else {
    printLog("MSG_changeLang", { type: "error" });
  }
}

/** 查询当前 token 信息，并存储 */
export function searchToSave() {
  const { fileConfig, registryConfig } = baseInitConfig;
  if (!registryConfig._authtoken) {
    printLog("MSG_save_04", { type: "error" });
    return;
  }
  const accountList = fileConfig.nucm[registryConfig.registryName] || {};
  const account = Object.keys(accountList).filter(
    (name) => accountList[name] && accountList[name]["access-tokens"] === registryConfig._authtoken
  );
  const tokenTag = `nucm_${Date.now()}`;

  if (account.length > 0) {
    inquirer
      .prompt([
        {
          type: "confirm",
          message: `【${registryConfig.registryName}】${printLog("MSG_save_01", {
            isPrint: false
          })}`,
          name: "check"
        }
      ])
      .then((answers) => {
        if (answers.check) {
          inquirer
            .prompt([
              {
                type: "input",
                message: printLog("MSG_save_02", {
                  isPrint: false
                }),
                name: "name",
                default: tokenTag
              }
            ])
            .then((a) => {
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
          message: `【${registryConfig.registryName}】${printLog("MSG_save_03", {
            isPrint: false
          })}`,
          name: "name",
          default: tokenTag
        }
      ])
      .then((answers) => {
        if (answers.name) {
          addUser(answers.name, registryConfig._authtoken);
        }
      });
  }
}
