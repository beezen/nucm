export default {
  cn: {
    MSG_showVersion: "查看版本",
    MSG_accountList: "查看账号列表",
    MSG_switchAccount: "切换账号",
    MSG_addAccount: "添加账号",
    MSG_removeAccount: "移除账号",
    MSG_localizedLang: "使用本地化语言",
    MSG_getUserListDefaultLog: "暂无账号信息；请输入 nucm add <name> <access-tokens> 进行添加",
    MSG_accountNotFound: "当前账号不存在; 请输入 nucm ls 查看可切换账号列表",
    MSG_accountChanged: "已切换到账号",
    MSG_accountAddSuccess: "添加账号成功",
    MSG_accountRemoveSuccess: "移除账号成功",
    MSG_accountRemoveFail: "无此账号，请正确输入账号名",
    MSG_checkRegistry:
      "若要管理其他源账号信息，建议使用 NRM 对其他源进行注册。NRM 文档：https://www.npmjs.com/package/nrm 。",
    MSG_changeLang: "目前国际化只支持 en 或 cn",
    MSG_langChanged: "已切换到语言",
    MSG_init: "初始化",
    MSG_initSuccess: "nucm 初始化成功",
    MSG_help: "显示命令帮助",
    MSG_ls: "显示详细",
    MSG_ls_all: "显示所有账号详细",
    MSG_update: "更新版本",
    MSG_updateLatest: "当前已是最新版本",
    MSG_update01: "更新检查中......",
    MSG_update02: "更新检查失败。请执行 'npm install nucm@latest -g' 手动更新",
    MSG_updateSilent: "静默的",
    MSG_updateTips: "存在可更新的版本。",
    MSG_save: "保存当前账号",
    MSG_save_01: "当前账号已存在于账号列表中，无需重复存储。是否重命名？",
    MSG_save_02: "请输入新的账号别名",
    MSG_save_03: "当前账号未被存储，建议立即存储。请输入当前账号别名",
    MSG_save_04:
      "未查询到相关账号信息。可参考登录或集成流程：https://docs.npmjs.com/getting-started 和 https://docs.npmjs.com/integrations",
    MSG_setConfig: "本地文件更新数据不能为空",
    MSG_checkConfigInit: "根目录 .npmrc 配置文件不存在"
  },
  en: {
    MSG_showVersion: "show version",
    MSG_accountList: "show account list",
    MSG_switchAccount: "switch account",
    MSG_addAccount: "add account",
    MSG_removeAccount: "remove account",
    MSG_localizedLang: "use localized languages",
    MSG_getUserListDefaultLog:
      "No account information at present; Please enter 'nucm add <name> <access-tokens>' to add",
    MSG_accountNotFound:
      "The current account does not exist. Please enter 'nucm ls' to view the list of switchable accounts",
    MSG_accountChanged: "The account has been switched to",
    MSG_accountAddSuccess: "Add account success",
    MSG_accountRemoveSuccess: "Remove account success",
    MSG_accountRemoveFail: "There is no such account, please enter the correct account name",
    MSG_checkRegistry:
      "To manage other source account information, recommend NRM to register other sources.NRM document: https://www.npmjs.com/package/nrm .",
    MSG_changeLang: "At present, internationalization only supports en or cn",
    MSG_langChanged: "Switched to language",
    MSG_init: "initialize",
    MSG_initSuccess: "nucm initialized successfully",
    MSG_help: "display help for command",
    MSG_ls: "show detail",
    MSG_ls_all: "show all account details",
    MSG_update: "updated version",
    MSG_updateLatest: "The current version is already the latest version",
    MSG_update01: "During the update check ...",
    MSG_update02:
      "Update inspection failed.Please execute 'npm install nucm@latest -g' Manual Update",
    MSG_updateSilent: "silent",
    MSG_updateTips: "It can be updated to the latest version.",
    MSG_save: "Save the current account",
    MSG_save_01:
      "The current account already exists in the account list without repeated storage.Is it renamed?",
    MSG_save_02: "Please enter a new account alias",
    MSG_save_03:
      "The current account is not stored, it is recommended to store it immediately.Please enter the current account alias",
    MSG_save_04:
      "No account information is not queried.Refer to login or integrated flow: https://docs.npmjs.com/getting-started and https://docs.npmjs.com/integrations",
    MSG_setConfig: "Local file update data cannot be empty.",
    MSG_checkConfigInit: "The root directory .npmrc configuration file does not exist"
  }
};
