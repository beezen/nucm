import { terser } from "rollup-plugin-terser";
import { baseConfig } from "./rollup.config.base";

baseConfig.plugins.push(terser());
baseConfig.output.sourcemap = false;

export default baseConfig;
