import * as shell from "shelljs";
import { t } from "i18next";
import * as fs from "fs-extra";

const colors = require("colors");

interface LogOptions {
  type?: "info" | "warn" | "error"; // 日志类型
  data?: {
    [key: string]: any;
  }; // 数据。注意不能使用隐藏字段，查看 i18next 的 options。
  isPrint?: boolean; // 是否打印。默认 true
  lng?: "en" | "cn"; // 语言类型
}

/**
 * 链接符号
 * @param str 字符传
 * @param len 最大长度
 * @return 补充符号的长度
 */
export function line(str: string, len: number): string {
  return new Array(Math.max(2, len - str.length)).join("-");
}

/**
 * 字符串脱敏
 * @param str 字符串
 * @return 脱敏字符串
 */
export function desensitize(str: string): string {
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
export function compareVersion(v1: string | string[], v2: string | string[]): number {
  v1 = typeof v1 === "string" ? v1.split(".") : v1;
  v2 = typeof v2 === "string" ? v2.split(".") : v2;
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

/** 获取包管理器 */
export function getPackageManager(): "yarn" | "npm" {
  // 校验 yarn 是否存在
  const yarnVersion = shell.exec("yarn --version", { silent: true }).stdout.trim();
  if (yarnVersion) {
    return "yarn";
  }
  return "npm";
}

/**
 * 打印日志
 * @param message 消息体
 * @param options 配置
 * @param options.type 日志类型 info|warn|error
 * @param options.data 数据。注意不能使用隐藏字段，查看 i18next 的 options。
 * @param options.isPrint 是否打印。默认 true
 * @param options.lng 语言类型 en|cn
 */
export function printLog(message: string, options: LogOptions = {}): string {
  let { type, data = {}, isPrint = true, lng } = options;
  const colorsFnMap = {
    info: colors.green,
    warn: colors.yellow,
    error: colors.red
  };
  lng && (data = { ...data, lng });
  let tMessage = t(message, data) as string;
  colorsFnMap[type] && (tMessage = colorsFnMap[type](tMessage));
  if (!isPrint) {
    return tMessage;
  }
  console.log(tMessage);
  return "";
}

/** 获取 nrm 模块 */
export function getNrmModule(): string {
  try {
    const nrmCli = require.resolve("nrm/cli.js");
    if (fs.existsSync(nrmCli)) return nrmCli;
  } catch (_err) {}
  return "";
}

/**
 * 获取 npm 的 registry
 * @return registry 镜像源地址
 */
export function getRegistryUrl(): string {
  const registryUrl = shell.exec("npm config get registry", { silent: true }).stdout.trim();
  return registryUrl;
}
