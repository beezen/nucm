const ini = require("ini");
const fs = require("fs-extra");
const colors = require("colors");
const { getLangMessage } = require("../utils/index");
const { getConfig } = require("../index");

/** 初始化 */
function initInstall() {
  const config = getConfig();
  if (!config.baseConfig) {
    config.nucmrcConfig.baseConfig = {
      lang: "en"
    };
    fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  }
  console.log(getLangMessage("MSG_initSuccess").green);
}

module.exports = {
  initInstall
};
