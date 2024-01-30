import path from "path";
import ini from "ini";
import fs from "fs-extra";
import os from "os";
import inquirer from "inquirer";
import shell from "shelljs";
import "colors";
import { init, changeLanguage } from "i18next";
import { printLog, getNrmModule, getRegistryUrl } from "../utils/index";
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
  if (!key || !value) return printLog("config.valueEmpty", { type: "error" });
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
    printLog("config.notFound", { type: "error" });
    return false;
  }
  if (!fs.existsSync(nucmrc_path)) {
    const defaultBaseConfig = {
      baseConfig: {
        lang: "cn",
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
  const registry = getRegistryUrl() || config?.npm?.registry; // 当前启用源地址
  if (!registry || !config) return {};
  let registriesList = { ...registries, ...config.nrm }; // 源注册表
  let registryName = "";
  let _authtoken = config.npm[`${registry.replace(/^https?:/, "")}:_authToken`]; // 当前源的用户账号令牌
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
    setRegistryAlias(registryConfig);
    return false;
  }
  return true;
}

/**
 * 设置注册源别名
 * @param {*} registryConfig 注册源配置
 */
export function setRegistryAlias(registryConfig) {
  let registryRandomName = `registry_${Date.now()}`;
  inquirer
    .prompt([
      {
        type: "input",
        message: `【${registryConfig.registry}】${printLog("registry.setAlias", {
          isPrint: false
        })}`,
        name: "registryName",
        default: registryRandomName
      }
    ])
    .then((answers) => {
      if (answers.registryName) {
        const nrmCli = getNrmModule();
        if (!nrmCli) {
          printLog("registry.manage", { type: "error" });
          return;
        }
        shell.exec(`node ${nrmCli} add ${answers.registryName} ${registryConfig.registry}`);
      }
    });
}

/**
 * 环境准备
 * @param handler action监听函数
 */
export function prepareEnv(handler) {
  return function (options) {
    if (!checkConfigInit()) return false; // 配置初始化
    const fileConfig = getConfig(); // 基础配置
    const registryConfig = getRegistryConfig(fileConfig); // 源信息配置
    if (!isEnabled(registryConfig)) return false;
    // global 全局存储
    Object.assign(baseInitConfig, {
      fileConfig, // 配置文件
      registryConfig, // 源配置
      lang: fileConfig?.nucm?.baseConfig?.lang || "cn" // 语言
    });
    changeLanguage(baseInitConfig.lang);
    handler && handler(options);
  };
}

/**
 * 初始化本地语言
 * @param {string} lng 语言类型 en|cn
 */
export function initLanguage(lng = "cn") {
  init({
    resources: resourcesAll,
    lng,
    defaultNS: "base"
  });
}
