import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { builtinModules } from "node:module";
import pkg from "./package.json" with { type: "json" };

/**
 * Packages that should be bundled (not externalized)
 * @type {string[]}
 */
export const bundledPackages = [
  "p-limit",
  "deepmerge-ts",
  "hexo-is",
  "is-stream",
  "markdown-it",
  "node-cache",
  "is-file-stream",
  "strip-ansi",
  "ansi-regex",
];

/**
 * Simple uniq helper (replaces lodash.uniq)
 */
function uniq(arr) {
  return [...new Set(arr)];
}

/**
 * List external dependencies, excluding specific packages that should be bundled
 * @type {string[]}
 */
export const externalPackages = uniq(
  Object.keys(pkg.dependencies ?? {})
    .concat(Object.keys(pkg.devDependencies ?? {}))
    .concat([
      "hexo",
      "warehouse",
      "hexo-util",
      "canvas",
      "jsdom",
      "mime-db",
      "sbg-utility",
      "through2",
      "gulp",
      "bluebird",
    ])
).filter(
  (pkgName, idx, arr) =>
    !bundledPackages.includes(pkgName) && arr.indexOf(pkgName) === idx
);

const nodeBuiltinModules = uniq(
  builtinModules.flatMap((moduleName) => [moduleName, `node:${moduleName}`])
);

function isExternal(id) {
  return externalPackages.includes(id) || nodeBuiltinModules.includes(id);
}

const input = "src/index.ts";
const tsconfig = "./tsconfig.build.json";

export default [
  // =========================
  // ESM build
  // =========================
  {
    input,
    external: isExternal,
    output: {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig,
        declaration: false,
      }),
    ],
  },

  // =========================
  // CJS build
  // =========================
  {
    input,
    external: isExternal,
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "auto",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig,
        declaration: false,
      }),
    ],
  },
];
