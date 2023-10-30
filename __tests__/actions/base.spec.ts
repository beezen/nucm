import { addUser, getUserList, removeUser, changeUser } from "../../src/actions/base.js";
import { getConfig, getRegistryConfig, prepareEnv } from "../../src/common";
describe("action_base", () => {
  const name1 = "example1";
  const name2 = "example2";
  const token1 = "example_token1";
  const token2 = "example_token2";
  prepareEnv(() => {
    let config = getConfig();
    let registryName = getRegistryConfig(config).registryName;
    it("addUser", () => {
      addUser(name1, token1);
      addUser(name2, token2);
      config = getConfig();
      expect(config.nucm[registryName][name1]).toBeDefined();
      expect(config.nucm[registryName][name2]).toBeDefined();
    });

    it("changeUser", () => {
      expect(config.nucm[registryName][name1]["is-current"]).toBeUndefined();
      changeUser(name2);
      config = getConfig();
      expect(config.nucm[registryName][name2]["is-current"]).toBeDefined();
    });

    it("removeUser", () => {
      removeUser(name1);
      config = getConfig();
      expect(config.nucm[registryName][name1]).toBeUndefined();
    });

    it("getUserList", () => {
      expect(getUserList({}).indexOf(name2) > -1).toBeTruthy();
      expect(getUserList({ all: true }).indexOf(name2) > -1).toBeTruthy();
    });
  });
});
