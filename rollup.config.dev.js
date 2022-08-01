import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import path from "path";

export default {
  input: path.join(__dirname, "src/index.js"),
  output: {
    file: path.join(__dirname, "dist/index.js"),
    format: "cjs",
    sourcemap: true,
    exports: "named"
  },
  external: ["colors", "commander", "fs-extra", "ini", "inquirer", "os", "shelljs"],
  plugins: [
    resolve({ preferBuiltins: true }),
    json(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime"
    }),
    commonjs({})
  ]
};
