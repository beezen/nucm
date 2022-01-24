#!/usr/bin/env node
const program = require("commander");

const { getLangMessage } = require("../src/utils/index");
const { getUserList, changeUser, addUser, removeUser, changeLang } = require("../src/actions/base");
const { initInstall } = require("../src/actions/init");
const pkg = require("../package.json");

program.version(pkg.version, "-v,--version", getLangMessage("MSG_showVersion"));
program.helpOption("-h, --help", getLangMessage("MSG_help"));
program.command("ls").description(getLangMessage("MSG_accountList")).action(getUserList);
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

program.parse(process.argv);
