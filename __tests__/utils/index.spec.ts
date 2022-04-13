import {
  getConfig,
  getLangMessage,
  line,
  desensitize,
  compareVersion,
  getRegistryConfig,
  isEnabled
} from "../../src/utils";

describe("utils", () => {
  it("getConfig", () => {
    const {
      nucmrcConfig,
      npmrcConfig,
      nrmrcConfig,
      nucmrc_path,
      npmrc_path,
      nrmrc_path,
      baseConfig
    } = getConfig();

    expect(nucmrcConfig).toBeDefined();
    expect(npmrcConfig).toBeDefined();
    expect(nrmrcConfig).toBeDefined();
    expect(nucmrc_path).toBeDefined();
    expect(npmrc_path).toBeDefined();
    expect(nrmrc_path).toBeDefined();
    expect(baseConfig).toBeDefined();
  });

  it("getLangMessage", () => {
    const lang = require("../../src/lang/index.js");
    expect(getLangMessage("MSG_showVersion", "cn")).toBe(lang["cn"]["MSG_showVersion"]);
    expect(getLangMessage("MSG_showVersion", "en")).toBe(lang["en"]["MSG_showVersion"]);
  });

  it("line", () => {
    expect(line("ceshi", 10)).toBe("----");
    expect(line("ceshicesh", 10)).toBe("-");
    expect(line("ceshiceshiceshi", 10)).toBe("-");
  });

  it("desensitize", () => {
    expect(desensitize("ce")).toBe("ce");
    expect(desensitize("ceshi", 10)).toBe("......eshi");
    expect(desensitize("ceshi1ceshi2ceshi3", 10)).toBe("ceshi1......shi3");
  });

  it("compareVersion", () => {
    expect(compareVersion("2", "1.2")).toBe(1);
    expect(compareVersion("1.1", "1.2")).toBe(-1);
    expect(compareVersion("1.1", "1.1")).toBe(0);
    expect(compareVersion("1.2", "1.1")).toBe(1);
    expect(compareVersion("1.2.1", "1.2")).toBe(1);
    expect(compareVersion("1.2.1", "1.2.3")).toBe(-1);
    expect(compareVersion("1.0.0", "1")).toBe(0);
  });

  it("getRegistryConfig", () => {
    expect(getRegistryConfig()).toEqual({});
    const { registry, registryName, _authtoken } = getRegistryConfig(getConfig());
    expect(registry).toBeDefined();
    expect(registryName).toBeDefined();
    expect(_authtoken).toBeDefined();
  });

  it("isEnabled", () => {
    expect(isEnabled(getRegistryConfig(getConfig()))).toBeTruthy();
    expect(isEnabled({})).not.toBeTruthy();
  });
});
