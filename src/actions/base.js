const path = require("path");
const ini = require("ini");
const fs = require("fs-extra");
const exec = require("child_process").execSync;
const os = require("os");
const colors = require("colors");

const homedir = os.homedir(); // 用户目录

// 配置文件地址
const nucmrc_path = path.resolve(homedir, ".nucmrc");
const npmrc_path = path.resolve(homedir, ".npmrc");
const nrmrc_path = path.resolve(homedir, ".nrmrc");

/** 初始化配置 */
function init() {
  fs.ensureFileSync(nucmrc_path);
  fs.ensureFileSync(npmrc_path);
  fs.ensureFileSync(nrmrc_path);
  const nucmrcConfig = ini.parse(fs.readFileSync(nucmrc_path, "utf-8"));
  const npmrcConfig = ini.parse(fs.readFileSync(npmrc_path, "utf-8"));
  const nrmrcConfig = ini.parse(fs.readFileSync(nrmrc_path, "utf-8"));
  return {
    nucmrcConfig,
    npmrcConfig,
    nrmrcConfig
  };
}

const config = init(); // 基础配置

/**
 * 获取用户列表
 */
function getUserList() {
  let nucmrcConfig = config.nucmrcConfig;
  let defaultLog = "暂无账号信息；请输入 nucm add <name> <_authToken> 进行添加";
  let userList = Object.keys(nucmrcConfig)
    .map((key) => {
      return `${nucmrcConfig[key]["is-current"] ? "*" : " "} ${key} ${line(key, 10)} ${
        nucmrcConfig[key]["token"]
      }`;
    })
    .join("\n");
  console.log(userList || defaultLog.red);
}

/** 变更用户 */
function changeUser(name) {
  if (!isEnabeld()) return;
  let nucmrcConfig = config.nucmrcConfig;
  let npmrcConfig = config.npmrcConfig;
  if (!nucmrcConfig[name]) {
    console.log("当前账号不存在; 请输入 nucm ls 查看可切换账号".red);
    return;
  }
  if (npmrcConfig["//registry.npmjs.org/:_authToken"]) {
    npmrcConfig["//registry.npmjs.org/:_authToken"] = nucmrcConfig[name]["token"];
    Object.keys(nucmrcConfig).forEach((key) => {
      if (nucmrcConfig[key]["is-current"]) {
        delete nucmrcConfig[key]["is-current"];
      }
    });
    nucmrcConfig[name]["is-current"] = true;
    fs.writeFileSync(nucmrc_path, ini.stringify(nucmrcConfig));
    fs.writeFileSync(npmrc_path, ini.stringify(npmrcConfig));
    console.log(`已切换到账号 ${name}`.green);
  }
}

/** 添加用户 */
function addUser(name, token) {
  let nucmrcConfig = config.nucmrcConfig;
  !nucmrcConfig[name] && (nucmrcConfig[name] = {});
  nucmrcConfig[name]["token"] = token;
  fs.writeFileSync(nucmrc_path, ini.stringify(nucmrcConfig));
  console.log("添加成功".green);
}

/** 移除用户 */
function removeUser(name) {
  let nucmrcConfig = config.nucmrcConfig;
  delete nucmrcConfig[name];
  fs.writeFileSync(nucmrc_path, ini.stringify(nucmrcConfig));
  console.log("移除成功".green);
}

/** 功能是否生效 */
function isEnabeld() {
  let npmrcConfig = config.npmrcConfig;
  if (npmrcConfig.registry && npmrcConfig.registry.indexOf("registry.npmjs.org") > -1) {
    return true;
  }
  console.log(
    `当前源为 ${npmrcConfig.registry}，非 npm 官方源; nucm 相关功能暂时只在 npm 官方源时生效`.red
  );
  return false;
}

/** 获取当前注册源 */
function getCurrentRegistry() {
  return exec("npm config get registry").toString("utf8").trim().replace(/\n|\r/gi, "");
}

/** 获取当前用户账号 */
function getCurrentUser() {
  return exec("npm whoami").toString("utf8").trim().replace(/\n|\r/gi, "");
}

/** 链接符号 */
function line(str, len) {
  return new Array(Math.max(2, len - str.length)).join("-");
}

module.exports = {
  getUserList,
  changeUser,
  addUser,
  removeUser
};
