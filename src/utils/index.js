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

module.exports = {
  getLangMessage,
  line
};
