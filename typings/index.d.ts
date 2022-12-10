/// <reference types="node" />
export = spawn;
declare function spawn(command: any, args: any, options: any): cp.ChildProcessWithoutNullStreams;
declare namespace spawn {
    export { spawn, spawnSync as sync, spawnAsync as async, parse as _parse, enoent as _enoent };
}
import cp = require("child_process");
declare function spawnSync(command: any, args: any, options: any): cp.SpawnSyncReturns<string>;
/**
 * Spawn asynchronously.
 *
 * @description
 * @param {string} command - Command.
 * @param {string[]} args - Arguments.
 * @param {import('child_process').SpawnOptions} options - Spawn Options.
 * @returns {Promise<{ stdout: string, stderr: string, err: string | null }>} Return Promise.
 */
declare function spawnAsync(command: string, args: string[], options: import('child_process').SpawnOptions): Promise<{
    stdout: string;
    stderr: string;
    err: string | null;
}>;
import parse = require("./lib/parse");
import enoent = require("./lib/enoent");
//# sourceMappingURL=index.d.ts.map