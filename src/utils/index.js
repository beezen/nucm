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
  return {
    nucmrcConfig,
    npmrcConfig,
    nrmrcConfig,
    nucmrc_path,
    npmrc_path,
    nrmrc_path,
    baseConfig: nucmrcConfig.baseConfig // 基础配置
  };
}

/**
 * 获取国际化语言消息
 * @param messageName 消息名
 * @param lang 语言类型。默认读取配置文件
 */
function getLangMessage(messageName, lang) {
  const langConfig = require("../lang/index");
  const currentLang = lang || (config.baseConfig && config.baseConfig.lang) || "en";
  return langConfig[currentLang][messageName];
}

/**
 * 链接符号
 * @param str 字符传
 * @param len 最大长度
 * @return 补充符号的长度
 */
function line(str, len) {
  return new Array(Math.max(2, len - str.length)).join("-");
}

/**
 * 字符串脱敏
 * @param str 字符串
 * @return 脱敏字符串
 */
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
 * @param config 配置信息
 * @return 源相关信息 {registry,registryName,nrmEnabled,_authtoken}
 */
function getRegistryConfig(config) {
  if (!config?.npmrcConfig) return {};
  const registry = config.npmrcConfig.registry; // 当前启用源地址
  let registries = require("../constants/registries.json");
  let registryName = "";
  let _authtoken = registry
    ? config.npmrcConfig[`${registry.replace(/^https?:/, "")}:_authToken`]
    : ""; // 当前源，用户账号令牌

  // 校验 nrm 是否存在
  const nrmVersion = shell.exec("nrm --version", { silent: true }).stdout.trim();
  if (nrmVersion) {
    registries = { ...registries, ...config.nrmrcConfig };
  }
  // 获取当前源别名
  for (let key in registries) {
    if (
      registries[key].registry &&
      registry.indexOf(registries[key].registry.replace(/^https?:\/\/|\/*$/g, "")) > -1
    ) {
      registryName = key;
    }
  }
  return {
    registry,
    registryName,
    _authtoken
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
