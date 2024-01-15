import shell from "shelljs";
import { getNrmModule, printLog } from "../utils/index";
/** 代理 NRM 工具指令 */
export function proxyNrm(cmd) {
  const nrmCmd = cmd.join(" ");
  const nrmCli = getNrmModule();
  if (!nrmCli) {
    return printLog("registry.noNrm");
  }
  shell.exec(`node ${nrmCli} ${nrmCmd}`);
}
