#!/usr/bin/env node
const program = require("commander");

const { getLangMessage } = require("../src/utils/index");
const { getUserList, changeUser, addUser, removeUser, changeLang } = require("../src/actions/base");
const { initInstall, updateVersion } = require("../src/actions/init");
const { getConfig } = require("../src/index");
const pkg = require("../package.json");
const config = getConfig();

program.version(pkg.version, "-v,--version", getLangMessage("MSG_showVersion"));
program.helpOption("-h, --help", getLangMessage("MSG_help"));
program
  .command("ls")
  .option("-l,--list", getLangMessage("MSG_ls"))
  .description(getLangMessage("MSG_accountList"))
  .action(getUserList);
program.command("use <name>").description(getLangMessage("MSG_switchAccount")).action(changeUser);
program
  .command("add <name> <access-tokens>")
  .description(getLangMessage("MSG_addAccount"))
  .action(addUser);
program.command("del <name>").description(getLangMessage("MSG_removeAccount")).action(removeUser);
program
  .command("localize <lang>")
  .description(getLangMessage("MSG_localizedLang"))
  .action(changeLang);
program.command("install").description(getLangMessage("MSG_init")).action(initInstall);
program
  .command("update")
  .option("--silent", getLangMessage("MSG_updateSilent"))
  .description(getLangMessage("MSG_update"))
  .action(updateVersion);

program.parse(process.argv);

// 更新校验
if (config?.baseConfig?.checkUpdateDate) {
  if (Date.now() - config.baseConfig.checkUpdateDate >= 1000 * 60 * 60 * 24 * 30) {
    updateVersion({ silent: true }); // 静默校验
  }
}
