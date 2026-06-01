'use strict';

import { describe, expect, it } from "@jest/globals";
import cp, * as cpa from "../dist/index.mjs";

describe("dist ESM bundle", function () {
    it("should export default spawn function", function () {
        expect(typeof cp).toBe("function");
        expect(typeof cpa.default).toBe("function");
    });

    it("should export spawnSync function", function () {
        expect(typeof cpa.spawnSync).toBe("function");
        expect(typeof cp.spawnSync).toBe("function");
    });
});

describe("spawnSync from dist", function () {
    it("should execute git status successfully", function () {
        const result = cpa.spawnSync("git", ["status"]);
        expect(result).toBeDefined();
        expect(result).toHaveProperty("stdout");
        expect(result).toHaveProperty("stderr");
        expect(result).toHaveProperty("status");
        expect(result).toHaveProperty("pid");
        expect(Buffer.isBuffer(result.stdout)).toBe(true);
    });
});
