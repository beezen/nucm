const ini = require("ini");
const fs = require("fs-extra");
const colors = require("colors");
const { getLangMessage, getConfig } = require("../utils/index");

/** 初始化 */
function initInstall() {
  const config = getConfig();
  const defaultBaseConfig = {
    lang: "en",
    checkUpdateDate: Date.now()
  };
  config.nucmrcConfig.baseConfig = { ...defaultBaseConfig, ...config.baseConfig };
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  console.log(getLangMessage("MSG_initSuccess").green);
}

module.exports = {
  initInstall
};
