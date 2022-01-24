const path = require("path");
const ini = require("ini");
const fs = require("fs-extra");
const os = require("os");
const colors = require("colors");

const homedir = os.homedir(); // 用户目录

// 配置文件地址
const nucmrc_path = path.resolve(homedir, ".nucmrc");
const npmrc_path = path.resolve(homedir, ".npmrc");
const nrmrc_path = path.resolve(homedir, ".nrmrc");

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

module.exports = {
  getConfig
};
