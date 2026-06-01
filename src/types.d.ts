/// <reference types="node" />

import * as child_process from "child_process";

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
    const sync: typeof child_process.spawnSync;

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
    const spawnSync: typeof child_process.spawnSync;

    /**
     * The `spawnAsync()` method spawns a new process using the given `command`, with
     * command line arguments in `args`. If omitted, `args` defaults to an empty array.
     */
    const spawnAsync: (
        command: string,
        args?: readonly string[],
        options?: child_process.SpawnOptions,
    ) => Promise<{ stdout: string; stderr: string; output: string; error: string | null }>;
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

export = spawn;
