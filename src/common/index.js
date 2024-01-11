import path from "path";
import ini from "ini";
import fs from "fs-extra";
import os from "os";
import shell from "shelljs";
import "colors";
import { init, changeLanguage } from "i18next";
import { printLog } from "../utils/index";
import registries from "../constants/registries.json";
import { resourcesAll } from "../lang/default/index";
import { baseInitConfig } from "./env";

const homedir = os.homedir(); // 用户目录
const nucmrc_path = path.resolve(homedir, ".nucmrc"); // .nucmrc 配置文件地址
const npmrc_path = path.resolve(homedir, ".npmrc"); // .npmrc 配置文件地址
const nrmrc_path = path.resolve(homedir, ".nrmrc"); // .nrmrc 配置文件地址

/**
 * 设置本地配置文件信息
 * @param key 文件名
 * @param value 文件信息
 */
export function setConfig(key, value) {
  if (!key || !value) return printLog("MSG_setConfig", { type: "error" });
  const pathList = {
    nucm: nucmrc_path,
    npm: npmrc_path,
    nrm: nrmrc_path
  };
  fs.writeFileSync(pathList[key], ini.stringify(value));
}

/** 获取本地配置文件信息 */
export function getConfig() {
  const nucm = ini.parse(fs.readFileSync(nucmrc_path, "utf-8"));
  const npm = ini.parse(fs.readFileSync(npmrc_path, "utf-8"));
  let nrm = null;
  if (fs.existsSync(nrmrc_path)) {
    nrm = ini.parse(fs.readFileSync(nrmrc_path, "utf-8"));
  }
  return {
    nucm,
    npm,
    nrm
  };
}

/**
 * 校验 .npmrc 配置文件是否存在，并初始化配置文件
 * @return true-初始化，false-未能初始化
 */
export function checkConfigInit() {
  if (!fs.existsSync(npmrc_path)) {
    printLog("MSG_checkConfigInit", { type: "error" });
    return false;
  }
  if (!fs.existsSync(nucmrc_path)) {
    const defaultBaseConfig = {
      baseConfig: {
        lang: "en",
        checkUpdateDate: Date.now()
      }
    };
    fs.ensureFileSync(nucmrc_path);
    fs.writeFileSync(nucmrc_path, ini.stringify(defaultBaseConfig));
  }
  return true;
}

/**
 * 获取注册源
 * @param config 配置信息
 * @return 当前源相关信息 {registry,registryName,_authtoken}
 */
export function getRegistryConfig(config) {
  const registry = config?.npm?.registry; // 当前启用源地址
  if (!registry) return {};
  let registriesList = registries; // 源注册表
  let registryName = "";
  let _authtoken = config.npm[`${registry.replace(/^https?:/, "")}:_authToken`]; // 当前源的用户账号令牌

  // 校验 nrm 是否存在
  const nrmVersion = shell.exec("nrm --version", { silent: true }).stdout.trim();
  if (nrmVersion && config?.nrm) {
    // 判断配置文件是否存在
    registriesList = { ...registriesList, ...config.nrm };
  }
  // 获取当前源别名
  for (let key in registriesList) {
    let currentRegistry = registriesList[key]?.registry?.replace(/^https?:\/\/|\/*$/g, "");
    if (registry.indexOf(currentRegistry) > -1) {
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
export function isEnabled(registryConfig) {
  if (!registryConfig.registryName) {
    printLog(
      `registry: ${registryConfig.registry}.${printLog("MSG_checkRegistry", { isPrint: false })}`,
      { type: "error" }
    );
    return false;
  }
  return true;
}

/**
 * 环境准备
 * @param callback 回调函数
 */
export function prepareEnv(callback) {
  initLanguage(); // 初始化语言配置
  if (!checkConfigInit()) return; // 配置初始化
  const fileConfig = getConfig(); // 基础配置
  const registryConfig = getRegistryConfig(fileConfig); // 源信息配置
  if (!isEnabled(registryConfig)) return;
  // global 全局存储
  Object.assign(baseInitConfig, {
    fileConfig, // 配置文件
    registryConfig, // 源配置
    lang: fileConfig?.nucm?.baseConfig?.lang || "en" // 语言
  });
  changeLanguage(baseInitConfig.lang);
  callback && callback(baseInitConfig);
}

/**
 * 初始化本地语言
 * @param {string} lng 语言类型 en|zh
 */
export function initLanguage(lng = "en") {
  init({
    resources: resourcesAll,
    lng,
    defaultNS: "base"
  });
}
