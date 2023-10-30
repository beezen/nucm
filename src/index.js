import { Command } from "commander";
import { getLangMessage, prepareEnv } from "./common/index";
import { getUserList, changeUser, addUser, removeUser } from "./actions/base";
import { updateVersion, changeLang, searchToSave } from "./actions/helper";

prepareEnv(() => {
  const pkg = require("../package.json");
  const program = new Command();
  program.version(pkg.version, "-v,--version", getLangMessage("MSG_showVersion"));
  program.helpOption("-h, --help", getLangMessage("MSG_help"));
  program
    .command("ls")
    .option("-l,--list", getLangMessage("MSG_ls"))
    .option("-a,--all", getLangMessage("MSG_ls_all"))
    .description(getLangMessage("MSG_accountList"))
    .action(getUserList);
  program
    .command("use <name>")
    .description(getLangMessage("MSG_switchAccount"))
    .action(changeUser);
  program
    .command("add <name> <access-tokens>")
    .description(getLangMessage("MSG_addAccount"))
    .action(addUser);
  program
    .command("del <name>")
    .description(getLangMessage("MSG_removeAccount"))
    .action(removeUser);
  program
    .command("localize <lang>")
    .alias("language")
    .description(getLangMessage("MSG_localizedLang"))
    .action(changeLang);
  program
    .command("update")
    .option("--silent", getLangMessage("MSG_updateSilent"))
    .description(getLangMessage("MSG_update"))
    .action(options => updateVersion(options, pkg.version));
  program
    .command("save")
    .description(getLangMessage("MSG_save"))
    .action(searchToSave);

  program.parse(process.argv);
});
