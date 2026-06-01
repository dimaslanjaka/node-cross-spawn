"use strict";

import { beforeAll, expect, it } from "@jest/globals";

import { describe } from "@jest/globals";
import cp from "../src";

const asyncSpawner = (cp as any).async;

describe("push --dry-run", function () {
    let spawner: Awaited<ReturnType<typeof asyncSpawner>>;
    beforeAll(async function () {
        spawner = await asyncSpawner("git", [
            "status",
        ]);
    });
    it("should have properties", function () {
        expect(spawner).toHaveProperty("output");
        expect(spawner).toHaveProperty("error");
        expect(spawner).toHaveProperty("stderr");
        expect(spawner).toHaveProperty("stdout");
    });
});
