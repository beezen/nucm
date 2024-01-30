import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import nodeExternals from "rollup-plugin-node-externals";

const baseConfig = {
  input: "src/index.js",
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
    resolve({ preferBuiltins: true }),
    json(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime"
    }),
    commonjs({})
  ]
};

export { baseConfig };
