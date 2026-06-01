'use strict';

import * as child_process from "child_process";
import * as internalSpawn from './spawn';
import { SpawnModule } from "./types";

if (typeof module !== 'undefined' && 'exports' in module) {
  module.exports = internalSpawn.spawn;
  module.exports.spawn = internalSpawn.spawn;
  module.exports.sync = internalSpawn.spawnSync;
  module.exports.async = internalSpawn.spawnAsync;
  module.exports.spawnSync = internalSpawn.spawnSync;
  module.exports.spawnAsync = internalSpawn.spawnAsync;
  module.exports._parse = internalSpawn._parse;
  module.exports._enoent = internalSpawn._enoent;
}

export * from './spawn';
// export const spawn = internalSpawn.spawn;
export const sync = internalSpawn.spawnSync;
export const async = internalSpawn.spawnAsync;
export const spawnSync = internalSpawn.spawnSync;
export const spawnAsync = internalSpawn.spawnAsync;
export const _parse = internalSpawn._parse;
export const _enoent = internalSpawn._enoent;
// export default internalSpawn.spawn;

declare namespace spawn {
    /**
     * The `spawn()` method spawns a new process using the given `command`, with
     * command line arguments in `args`. If omitted, `args` defaults to an empty array.
     */
    const spawn: typeof child_process.spawn;

    /**
     * The `spawn.sync()` method spawns a new process using the given `command`, with
     * command line arguments in `args`. If omitted, `args` defaults to an empty array.
     */
    const sync: (command: string, args?: readonly string[], options?: child_process.SpawnOptions) => import('./spawn').spawnSyncReturn;

    /**
     * The `async()` method spawns a new process using the given `command`, with
     * command line arguments in `args`. If omitted, `args` defaults to an empty array.
     */
    const async: (
        command: string,
        args?: readonly string[],
        options?: child_process.SpawnOptions,
    ) => Promise<{ stdout: string; stderr: string; output: string; error: string | null }>;

    /**
     * The `spawnSync()` method spawns a new process using the given `command`, with
     * command line arguments in `args`. If omitted, `args` defaults to an empty array.
     */
    const spawnSync: typeof internalSpawn.spawnSync;

    /**
     * The `spawnAsync()` method spawns a new process using the given `command`, with
     * command line arguments in `args`. If omitted, `args` defaults to an empty array.
     */
    const spawnAsync: typeof internalSpawn.spawnAsync;
}

/**
 * The `spawn()` method spawns a new process using the given `command`, with
 * command line arguments in `args`. If omitted, `args` defaults to an empty array.
 */
declare function spawn(command: string, options: child_process.SpawnOptions): child_process.ChildProcess;
declare function spawn(
    command: string,
    args?: readonly string[],
    options?: child_process.SpawnOptions,
): child_process.ChildProcess;

const spawnFn = ((command: string, args?: any, options?: any) => {
    return child_process.spawn(command, args, options);
}) as SpawnModule;
Object.assign(spawnFn, {
    sync: internalSpawn.spawnSync,
    async: internalSpawn.spawnAsync,
    spawnSync: internalSpawn.spawnSync,
    spawnAsync: internalSpawn.spawnAsync,

    _parse: internalSpawn._parse,
    _enoent: internalSpawn._enoent,
});

export default spawnFn;
