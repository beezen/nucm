import { Command } from "commander";
import { prepareEnv } from "./common/index";
import { getUserList, changeUser, addUser, removeUser } from "./actions/base";
import { updateVersion, changeLang, searchToSave } from "./actions/helper";
import { printLog } from "./utils/index";
prepareEnv(() => {
  const pkg = require("../package.json");
  const program = new Command();
  program.version(pkg.version, "-v,--version", printLog("MSG_showVersion", { isPrint: false }));
  program.helpOption("-h, --help", printLog("MSG_help", { isPrint: false }));
  program
    .command("ls")
    .option("-l,--list", printLog("MSG_ls", { isPrint: false }))
    .option("-a,--all", printLog("MSG_ls_all", { isPrint: false }))
    .description(printLog("MSG_accountList", { isPrint: false }))
    .action(getUserList);
  program
    .command("use <name>")
    .description(printLog("MSG_switchAccount", { isPrint: false }))
    .action(changeUser);
  program
    .command("add <name> <access-tokens>")
    .description(printLog("MSG_addAccount", { isPrint: false }))
    .action(addUser);
  program
    .command("del <name>")
    .description(printLog("MSG_removeAccount", { isPrint: false }))
    .action(removeUser);
  program
    .command("localize <lang>")
    .alias("language")
    .description(printLog("MSG_localizedLang", { isPrint: false }))
    .action(changeLang);
  program
    .command("update")
    .option("--silent", printLog("MSG_updateSilent", { isPrint: false }))
    .description(printLog("MSG_update", { isPrint: false }))
    .action((options) => updateVersion(options, pkg.version));
  program
    .command("save")
    .description(printLog("MSG_save", { isPrint: false }))
    .action(searchToSave);

  program.parse(process.argv);
});
