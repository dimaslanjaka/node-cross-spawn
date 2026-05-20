"use strict";

import { ChildProcess, SpawnOptions } from "child_process";
import * as spawn from "../../dist/index.cjs";

function isForceShell(method: string) {
    return /-force-shell$/.test(method);
}

function isMethodSync(method: string) {
    return /^sync(-|$)/.test(method);
}

function resolveRun(
    exitCode: number | null,
    stdout: string | Buffer | null,
    stderr: string | Buffer | null
) {
    stdout = stdout && stdout.toString();
    stderr = stderr && stderr.toString();

    if (exitCode !== 0) {
        return Object.assign(
            new Error(`Command failed, exited with code #${exitCode}`),
            {
                exitCode,
                stdout,
                stderr,
            }
        );
    }

    return {
        stdout,
        stderr,
    };
}

function runSync(
    command: string,
    args: string[],
    options: SpawnOptions | undefined
) {
    const { error, status, stdout, stderr } = spawn.sync!(
        command,
        args,
        options
    );

    if (error) {
        throw error;
    }

    const resolved = resolveRun(status, stdout, stderr);

    if (resolved instanceof Error) {
        throw resolved;
    }

    return resolved;
}

function runAsync(
    command: string,
    args: string[] | SpawnOptions,
    options: SpawnOptions | undefined
) {
    const cp = spawn.async!(command, args, options);

    const promise = new Promise<spawnResult>((resolve, reject) => {
        let stdout: Buffer | null = null;
        let stderr: Buffer | null = null;

        cp.stdout &&
            cp.stdout.on("data", (data: Buffer) => {
                stdout = stdout || Buffer.from("");
                stdout = Buffer.concat([stdout, data]);
            });

        cp.stderr &&
            cp.stderr.on("data", (data: Buffer) => {
                stderr = stderr || Buffer.from("");
                stderr = Buffer.concat([stderr, data]);
            });

        const cleanupListeners = () => {
            cp.removeListener("error", onError);
            cp.removeListener("close", onClose);
        };

        const onError = (err: Error) => {
            cleanupListeners();
            reject(err);
        };

        const onClose = (code: number | null) => {
            cleanupListeners();

            const resolved = resolveRun(code, stdout, stderr);

            if (resolved instanceof Error) {
                reject(resolved);
            } else {
                resolve(resolved);
            }
        };

        cp.on("error", onError).on("close", onClose);
    });

    (promise as Promise<spawnResult> & { cp: ChildProcess }).cp = cp;

    return promise;
}

interface spawnResult {
    stdout: string | null;
    stderr: string | null;
}

/**
 * async spawner
 * @param method
 * @param command
 * @param args
 * @param options
 */
function run(
    method: 'async',
    command: string,
    args: string[],
    options?: SpawnOptions & Record<string, any>
): Promise<spawnResult>;
/**
 * sync runner
 * @param method
 * @param command
 * @param args
 * @param options
 */
function run(
    method: 'sync',
    command: string,
    args: string[],
    options?: SpawnOptions & Record<string, any>
): spawnResult

/**
 * spawner
 * @param method
 * @param command
 * @param args
 * @param options
 * @returns
 */
function run(
    method: string,
    command: string,
    args: string[],
    options?: SpawnOptions & Record<string, any>
) {
    // Are we forcing the shell?
    if (isForceShell(method)) {
        if (args && !Array.isArray(args)) {
            options = args;
            args = [];
        }

        method = method.replace(/-force-shell$/, "");
        options = { forceShell: true, ...options };
    }

    // Run sync version
    return method === "sync"
        ? runSync(command, args, options)
        : runAsync(command, args, options);
}

/*
module.exports = run;
module.exports.methods = [
    "spawn-force-shell",
    "spawn",
    "sync-force-shell",
    "sync",
];
module.exports.isMethodSync = isMethodSync;
module.exports.isForceShell = isForceShell;
*/

export default run;
export const methods = [
    "spawn-force-shell",
    "spawn",
    "sync-force-shell",
    "sync",
];
export { isForceShell, isMethodSync };

