"use strict";

import * as child_process from "child_process";
import * as internalSpawn from "./spawn";

/**
 * Helpers type (keeps full inference)
 */
type SpawnHelpers = {
  sync: typeof internalSpawn.spawnSync;
  async: typeof internalSpawn.spawnAsync;
  spawnSync: typeof internalSpawn.spawnSync;
  spawnAsync: typeof internalSpawn.spawnAsync;
  spawn: typeof internalSpawn.spawn;
  _parse: typeof internalSpawn._parse;
  _enoent: typeof internalSpawn._enoent;
};

/**
 * Callable function type
 */
type SpawnCall = {
  (
    command: string,
    args?: readonly string[] | child_process.SpawnOptions,
    options?: child_process.SpawnOptions
  ): child_process.ChildProcess;
};

/**
 * Final exported type = callable + helpers
 */
type SpawnModule = SpawnCall & SpawnHelpers;

/**
 * Base callable function (NO casting to full module yet)
 */
const spawnCall: SpawnCall = function (command: string, args?: any, options?: any) {
  return child_process.spawn(command, args, options);
};

/**
 * Helpers object (fully inferred here — THIS is the key fix)
 */
const spawnHelpers = {
  sync: internalSpawn.spawnSync,
  async: internalSpawn.spawnAsync,
  spawnSync: internalSpawn.spawnSync,
  spawnAsync: internalSpawn.spawnAsync,
  _parse: internalSpawn._parse,
  _enoent: internalSpawn._enoent,
  spawn: internalSpawn.spawn
} satisfies SpawnHelpers;

/**
 * Merge into final module WITHOUT breaking inference
 */
const spawn: SpawnModule = Object.assign(spawnCall, spawnHelpers);

/**
 * Exports
 */
export default spawn;

export const sync = spawn.sync;
export const async = spawn.async;
export const spawnSync = spawn.spawnSync;
export const spawnAsync = spawn.spawnAsync;
export const _parse = spawn._parse;
export const _enoent = spawn._enoent;
export { spawn };
