/** 获取国际化语言消息 */
function getLangMessage(messageName) {
  const config = require("../index").getConfig(); // 基础配置
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

module.exports = {
  getLangMessage,
  line,
  desensitize
};
