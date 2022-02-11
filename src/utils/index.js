const path = require("path");
const ini = require("ini");
const fs = require("fs-extra");
const os = require("os");
const shell = require("shelljs");
const colors = require("colors");
const homedir = os.homedir(); // 用户目录
// 配置文件地址
const nucmrc_path = path.resolve(homedir, ".nucmrc");
const npmrc_path = path.resolve(homedir, ".npmrc");
const nrmrc_path = path.resolve(homedir, ".nrmrc");
const config = getConfig(); // 基础配置

/** 获取配置信息 */
function getConfig() {
  fs.ensureFileSync(nucmrc_path);
  fs.ensureFileSync(npmrc_path);
  fs.ensureFileSync(nrmrc_path);
  const nucmrcConfig = ini.parse(fs.readFileSync(nucmrc_path, "utf-8"));
  const npmrcConfig = ini.parse(fs.readFileSync(npmrc_path, "utf-8"));
  const nrmrcConfig = ini.parse(fs.readFileSync(nrmrc_path, "utf-8"));
  const npmAccountList = nucmrcConfig.npm; // npm 账号列表
  const baseConfig = nucmrcConfig.baseConfig; // 基础配置
  return {
    nucmrcConfig,
    npmrcConfig,
    nrmrcConfig,
    nucmrc_path,
    npmrc_path,
    nrmrc_path,
    npmAccountList,
    baseConfig
  };
}

/** 获取国际化语言消息 */
function getLangMessage(messageName) {
  const langConfig = require("../lang/index");
  const lang = (config.baseConfig && config.baseConfig.lang) || "en";
  return langConfig[lang][messageName];
}

/** 链接符号 */
function line(str, len) {
  return new Array(Math.max(2, len - str.length)).join("-");
}

/** 脱敏 */
function desensitize(str) {
  if (str.length <= 4) return str;
  if (str.length <= 10) return `......${str.slice(-4)}`;
  return `${str.slice(0, 6)}......${str.slice(-4)}`;
}

/**
 * 版本比较
 * @param v1 版本号1
 * @param v2 版本号2
 * @return 1(v1>v2)|-1(v1<v2)|0(v1=v2)
 */
function compareVersion(v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

/**
 * 获取注册源
 */
function getRegistryConfig() {
  let nrmEnabled = false;
  let registryName = "";
  const registry = config.npmrcConfig.registry;
  if (registry === "https://registry.npmjs.org/") {
    // npm 官方源
    return {
      registry,
      registryName: "npm",
      nrmEnabled
    };
  }
  const nrmrcConfig = config.nrmrcConfig;
  const nrmVersion = shell.exec("nrm --version", { silent: true }).stdout.trim();
  if (nrmVersion) {
    nrmEnabled = true;
    for (var key in nrmrcConfig) {
      if (nrmrcConfig[key].registry === registry) {
        registryName = key;
      }
    }
  }
  return {
    registry,
    registryName,
    nrmEnabled
  };
}

/**
 * 功能是否启用
 * @param registryConfig 源相关信息
 */
function isEnabled(registryConfig) {
  if (!registryConfig.registryName) {
    console.log(`registry: ${registryConfig.registry}.${getLangMessage("MSG_checkRegistry")}`.red);
    return false;
  }
  return true;
}

module.exports = {
  isEnabled,
  getLangMessage,
  line,
  desensitize,
  compareVersion,
  getConfig,
  getRegistryConfig
};
