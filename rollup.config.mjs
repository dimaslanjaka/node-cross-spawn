import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { builtinModules } from 'node:module';
import pkg from './package.json' with { type: 'json' };

/**
 * Packages that should be bundled (not externalized)
 * @type {string[]}
 */
export const bundledPackages = [
  'p-limit',
  'deepmerge-ts',
  'hexo-is',
  'is-stream',
  'markdown-it',
  'node-cache',
  'is-file-stream',
  'strip-ansi',
  'ansi-regex'
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
      'hexo',
      'warehouse',
      'hexo-util',
      'canvas',
      'jsdom',
      'mime-db',
      'sbg-utility',
      'through2',
      'gulp',
      'bluebird'
    ])
).filter((pkgName, idx, arr) => !bundledPackages.includes(pkgName) && arr.indexOf(pkgName) === idx);

const nodeBuiltinModules = uniq(builtinModules.flatMap((moduleName) => [moduleName, `node:${moduleName}`]));

function isExternal(id) {
  return externalPackages.includes(id) || nodeBuiltinModules.includes(id);
}

const input = {
  index: 'src/index.ts',
  'index-safe': 'src/index-safe.ts',
  spawn: 'src/spawn.ts',
  types: 'src/types.ts',
  'lib/enoent': 'src/lib/enoent.js',
  'lib/parse': 'src/lib/parse.js',
  'lib/util/escape': 'src/lib/util/escape.js',
  'lib/util/pathKey': 'src/lib/util/pathKey.js',
  'lib/util/readShebang': 'src/lib/util/readShebang.js',
  'lib/util/resolveCommand': 'src/lib/util/resolveCommand.js'
};
const tsconfig = './tsconfig.build.json';

export default [
  // =========================
  // ESM build
  // =========================
  {
    input,
    external: isExternal,
    output: {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig,
        declaration: false
      })
    ]
  },

  // =========================
  // CJS build (Main)
  // =========================
  {
    input: { index: 'src/index.ts' },
    external: isExternal,
    output: {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig,
        declaration: false
      })
    ]
  },

  // =========================
  // CJS build (Utils)
  // =========================
  {
    input: {
      'index-safe': 'src/index-safe.ts',
      spawn: 'src/spawn.ts',
      types: 'src/types.ts',
      'lib/enoent': 'src/lib/enoent.js',
      'lib/parse': 'src/lib/parse.js',
      'lib/util/escape': 'src/lib/util/escape.js',
      'lib/util/pathKey': 'src/lib/util/pathKey.js',
      'lib/util/readShebang': 'src/lib/util/readShebang.js',
      'lib/util/resolveCommand': 'src/lib/util/resolveCommand.js'
    },
    external: isExternal,
    output: {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig,
        declaration: false
      })
    ]
  },

  // =========================
  // DTS bundle
  // =========================
  {
    input: 'dist/index.d.ts',
    output: {
      file: 'dist/index.d.mts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
