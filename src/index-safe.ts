import * as child_process from "child_process";
import * as internalSpawn from "./spawn";
import type { SpawnModule } from "./types";

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

export const sync = spawnFn.sync;
export const async = spawnFn.async;
export const spawnSync = spawnFn.spawnSync;
export const spawnAsync = spawnFn.spawnAsync;
export const _parse = spawnFn._parse;
export const _enoent = spawnFn._enoent;

if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = spawnFn;
    module.exports.default = spawnFn;

    // optional named exports for CJS consumers
    module.exports.sync = spawnFn.sync;
    module.exports.async = spawnFn.async;
    module.exports.spawnSync = spawnFn.spawnSync;
    module.exports.spawnAsync = spawnFn.spawnAsync;
    module.exports._parse = spawnFn._parse;
    module.exports._enoent = spawnFn._enoent;
}
