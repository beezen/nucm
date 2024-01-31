import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import nodeExternals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";

const baseConfig = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    preserveModules: true,
    preserveModulesRoot: "src",
    format: "cjs",
    sourcemap: true,
    exports: "named"
  },
  plugins: [
    nodeExternals(),
    resolve({ preferBuiltins: true, extensions: [".ts", ".js"] }),
    commonjs({ extensions: [".ts", ".js"] }),
    json(),
    typescript(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions: [".ts", ".js"]
    })
  ]
};

export { baseConfig };
