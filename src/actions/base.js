const ini = require("ini");
const fs = require("fs-extra");
const colors = require("colors");
const { getLangMessage, line } = require("../utils/index");
const config = require("../index").getConfig(); // 基础配置

/**
 * 获取用户列表
 */
function getUserList() {
  let npmAccountList = config.npmAccountList;
  let defaultLog = getLangMessage("MSG_getUserListDefaultLog");
  let userList = Object.keys(npmAccountList)
    .map((key) => {
      if (npmAccountList[key]["is-current"]) {
        return colors.green(`* ${key} ${line(key, 10)} ${npmAccountList[key]["access-tokens"]}`);
      }
      return `  ${key} ${line(key, 10)} ${npmAccountList[key]["access-tokens"]}`;
    })
    .join("\n");
  console.log(userList || defaultLog.red);
}

/** 变更用户 */
function changeUser(name) {
  if (!isEnabeld()) return;
  let npmAccountList = config.npmAccountList;
  let npmrcConfig = config.npmrcConfig;
  if (!npmAccountList[name]) {
    console.log(getLangMessage("MSG_accountNotFound").red);
    return;
  }
  if (npmrcConfig["//registry.npmjs.org/:_authToken"]) {
    npmrcConfig["//registry.npmjs.org/:_authToken"] = npmAccountList[name]["access-tokens"];
    Object.keys(npmAccountList).forEach((key) => {
      if (npmAccountList[key]["is-current"]) {
        delete npmAccountList[key]["is-current"];
      }
    });
    npmAccountList[name]["is-current"] = true;
    fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
    fs.writeFileSync(config.npmrc_path, ini.stringify(npmrcConfig));
    console.log(`${getLangMessage("MSG_accountChanged")} ${name}`.green); // The account has been switched to
  }
}

/** 添加用户 */
function addUser(name, token) {
  let npmAccountList = config.npmAccountList;
  !npmAccountList[name] && (npmAccountList[name] = {});
  npmAccountList[name]["access-tokens"] = token;
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  console.log(getLangMessage("MSG_accountAddSuccess").green);
}

/** 移除用户 */
function removeUser(name) {
  let npmAccountList = config.npmAccountList;
  delete npmAccountList[name];
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  console.log(getLangMessage("MSG_accountRemoveSuccess").green);
}

/** 功能是否生效 */
function isEnabeld() {
  let npmrcConfig = config.npmrcConfig;
  if (npmrcConfig.registry && npmrcConfig.registry.indexOf("registry.npmjs.org") > -1) {
    return true;
  }
  console.log(`registry: ${npmrcConfig.registry}, ${getLangMessage("MSG_checkRegistry")}`.red);
  return false;
}

/** 切换语言 */
function changeLang(language) {
  let baseConfig = config.baseConfig;
  if (["en", "cn"].includes(language)) {
    baseConfig.lang = language;
    fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
    console.log(`${getLangMessage("MSG_langChanged")} ${language}`.green);
  } else {
    console.log(getLangMessage("MSG_changeLang").red);
  }
}

module.exports = {
  getUserList,
  changeUser,
  addUser,
  removeUser,
  changeLang
};
