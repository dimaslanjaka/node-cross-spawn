import * as child_process from "child_process";
import * as internalSpawn from "./spawn";

export type SpawnSyncResult = ReturnType<typeof internalSpawn.spawnSync>;
export type SpawnAsyncResult = ReturnType<typeof internalSpawn.spawnAsync>;

export type SpawnModule = {
  (command: string, args?: readonly string[] | child_process.SpawnOptions, options?: child_process.SpawnOptions): child_process.ChildProcess;

  sync: typeof internalSpawn.spawnSync;
  async: typeof internalSpawn.spawnAsync;
  spawnSync: typeof internalSpawn.spawnSync;
  spawnAsync: typeof internalSpawn.spawnAsync;

  _parse: typeof internalSpawn._parse;
  _enoent: typeof internalSpawn._enoent;
};
