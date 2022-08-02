import ini from "ini";
import fs from "fs-extra";
import "colors";
import { getLangMessage, getConfig } from "../utils/index";

/** 初始化 */
export function initInstall() {
  const config = getConfig();
  const defaultBaseConfig = {
    lang: "en",
    checkUpdateDate: Date.now()
  };
  config.nucmrcConfig.baseConfig = { ...defaultBaseConfig, ...config.baseConfig };
  fs.writeFileSync(config.nucmrc_path, ini.stringify(config.nucmrcConfig));
  console.log(getLangMessage("MSG_initSuccess").green);
}
