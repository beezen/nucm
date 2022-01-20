#!/usr/bin/env node
const program = require("commander");
const { getUserList, changeUser, addUser, removeUser } = require("../src/actions/base");

const pkg = require("../package.json");

program.version(pkg.version, "-v,--version", "查看版本");

program.command("ls").description("show version（查看用户列表）").action(getUserList);
program.command("use <name>").description("switch account（切换账号）").action(changeUser);
program.command("add <name> <token>").description("add account（添加账号）").action(addUser);
program.command("del <name>").description("remove account（移除账号）").action(removeUser);

program.parse(process.argv);
