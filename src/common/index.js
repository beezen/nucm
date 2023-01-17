import path from "path";
import ini from "ini";
import fs from "fs-extra";
import os from "os";
import shell from "shelljs";
import "colors";
import registries from "../constants/registries.json";
import langConfig from "../lang/index";

const homedir = os.homedir(); // 用户目录
const nucmrc_path = path.resolve(homedir, ".nucmrc"); // .nucmrc 配置文件地址
const npmrc_path = path.resolve(homedir, ".npmrc"); // .npmrc 配置文件地址
const nrmrc_path = path.resolve(homedir, ".nrmrc"); // .nrmrc 配置文件地址

/** 设置本地配置文件信息 */
export function setConfig(key, value) {
  if (!key || !value) return console.log(getLangMessage("MSG_setConfig").red);
  const obj = {
    nucm: nucmrc_path,
    npm: npmrc_path,
    nrm: nrmrc_path
  };
  fs.writeFileSync(obj[key], ini.stringify(value));
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
 * 校验初始配置文件是否完整
 * @return true-完整，false-不完整
 */
export function checkConfigInit() {
  if (!fs.existsSync(npmrc_path)) {
    console.log(getLangMessage("MSG_checkConfigInit").red);
    return false;
  }
  if (!fs.existsSync(nucmrc_path)) {
    const defaultBaseConfig = {
      baseConfig: {
        lang: "en",
        checkUpdateDate: Date.now()
      }
    };
    fs.writeFileSync(nucmrc_path, ini.stringify(defaultBaseConfig));
  }
  return true;
}

/**
 * 获取国际化语言消息
 * @param messageName 消息名
 * @param lang 语言类型。默认读取配置文件
 */
export function getLangMessage(messageName, lang) {
  const config = getConfig(); // 基础配置
  const baseConfig = config?.nucm?.baseConfig;
  const currentLang = lang || baseConfig?.lang || "en";
  return langConfig[currentLang][messageName];
}

/**
 * 获取注册源
 * @param config 配置信息
 * @return 当前源相关信息 {registry,registryName,_authtoken}
 */
export function getRegistryConfig(config) {
  const registry = config?.npm?.registry; // 当前启用源地址
  if (!registry) return {};
  let registriesList = registries; // 注册表
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
    if (
      registriesList[key].registry &&
      registry.indexOf(registriesList[key].registry.replace(/^https?:\/\/|\/*$/g, "")) > -1
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
export function isEnabled(registryConfig) {
  if (!registryConfig.registryName) {
    console.log(`registry: ${registryConfig.registry}.${getLangMessage("MSG_checkRegistry")}`.red);
    return false;
  }
  return true;
}
