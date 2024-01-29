import { Command } from "commander";
import { prepareEnv } from "./common/index";
import { getUserList, changeUser, addUser, removeUser } from "./actions/base";
import { updateVersion, changeLang, searchToSave } from "./actions/helper";
import { proxyNrm } from "./actions/registry";
import { printLog } from "./utils/index";
prepareEnv(() => {
  const pkg = require("../package.json");
  const program = new Command();
  program.version(pkg.version, "-v,--version", printLog("command.version", { isPrint: false }));
  program.helpOption("-h, --help", printLog("command.help", { isPrint: false }));
  program
    .command("ls")
    .option("-l,--list", printLog("command.listLs", { isPrint: false }))
    .option("-a,--all", printLog("command.listAll", { isPrint: false }))
    .description(printLog("command.list", { isPrint: false }))
    .action(getUserList);
  program
    .command("use <name>")
    .description(printLog("command.switchAccount", { isPrint: false }))
    .action(changeUser);
  program
    .command("add <name> <access-tokens>")
    .description(printLog("command.addAccount", { isPrint: false }))
    .action(addUser);
  program
    .command("del <name>")
    .description(printLog("command.removeAccount", { isPrint: false }))
    .action(removeUser);
  program
    .command("localize <lang>")
    .alias("language")
    .description(printLog("command.localizedLang", { isPrint: false }))
    .action(changeLang);
  program
    .command("update")
    .option("--silent", printLog("command.updateSilent", { isPrint: false }))
    .description(printLog("command.update", { isPrint: false }))
    .action((options) => updateVersion(options, pkg.version));
  program
    .command("save")
    .description(printLog("command.saveAccount", { isPrint: false }))
    .action(searchToSave);
  program
    .command("registry <cmd...>")
    .alias("nrm")
    .summary(printLog("command.registry", { isPrint: false }))
    .description(
      `
    subcommands:
      ls  // List all the registries
      add <name> <url>  // Add custom registry
      use <name>  // Change current registry
      del <name>  // Delete custom registry
    examples:
      $ nucm registry use taobao // Change taobao registry
      `
    )
    .action(proxyNrm);

  program.parse(process.argv);
});
