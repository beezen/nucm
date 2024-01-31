import { addUser, getUserList, removeUser, changeUser } from "../../src/actions/base";
import { getConfig, getRegistryConfig, prepareEnv, initLanguage } from "../../src/common";
import type { BaseConfig, RegistryConfig } from "../../src/common";

describe("action_base", () => {
  const name1 = "example1";
  const name2 = "example2";
  const token1 = "example_token1";
  const token2 = "example_token2";
  initLanguage();
  prepareEnv()();
  let config = getConfig() as BaseConfig;
  let nucmrcConfig = config.nucm;
  let registryName = (getRegistryConfig(config) as RegistryConfig).registryName;
  let accountObject = nucmrcConfig?.[registryName];
  let currentAccountName = ""; // 当前账号名
  Object.keys(accountObject).forEach((name) => {
    if (accountObject[name]["is-current"]) {
      currentAccountName = name;
    }
  });
  it("addUser", () => {
    addUser(name1, token1);
    addUser(name2, token2);
    config = getConfig();
    expect(config.nucm?.[registryName][name1]).toBeDefined();
    expect(config.nucm?.[registryName][name2]).toBeDefined();
  });

  it("changeUser", () => {
    expect(config.nucm?.[registryName][name1]["is-current"]).toBeUndefined();
    changeUser(name2);
    config = getConfig();
    expect(config.nucm?.[registryName][name2]["is-current"]).toBeDefined();
  });

  it("removeUser", () => {
    removeUser(name1);
    config = getConfig();
    expect(config.nucm?.[registryName][name1]).toBeUndefined();
  });

  it("getUserList", () => {
    expect(getUserList({}).indexOf(name2) > -1).toBeTruthy();
    expect(getUserList({ all: true }).indexOf(name2) > -1).toBeTruthy();
  });
  // 还原单测前状态
  it("backup", () => {
    removeUser(name2);
    changeUser(currentAccountName);
  });
});
