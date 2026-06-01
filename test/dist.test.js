"use strict";

const path = require("path");
// Directly resolve to the CJS bundle, bypassing package.json exports
const cp = require(path.resolve(__dirname, "../dist/index.cjs"));

describe("dist CJS bundle", function () {
    it("should export default spawn function", function () {
        expect(cp).toBeDefined();
        expect(typeof cp).toBe("function");
    });

    it("should have .spawn property", function () {
        expect(cp.spawn).toBeDefined();
        expect(typeof cp.spawn).toBe("function");
    });

    it("should have .sync property", function () {
        expect(cp.sync).toBeDefined();
        expect(typeof cp.sync).toBe("function");
    });

    it("should have .async property", function () {
        expect(cp.async).toBeDefined();
        expect(typeof cp.async).toBe("function");
    });

    it("should have .spawnSync property", function () {
        expect(cp.spawnSync).toBeDefined();
        expect(typeof cp.spawnSync).toBe("function");
    });

    it("should have .spawnAsync property", function () {
        expect(cp.spawnAsync).toBeDefined();
        expect(typeof cp.spawnAsync).toBe("function");
    });

    it("should have ._parse property", function () {
        expect(cp._parse).toBeDefined();
    });

    it("should have ._enoent property", function () {
        expect(cp._enoent).toBeDefined();
    });
});

describe("spawnSync from dist", function () {
    it("should execute git status successfully", function () {
        const result = cp.spawnSync("git", ["status"]);
        expect(result).toBeDefined();
        expect(result).toHaveProperty("stdout");
        expect(result).toHaveProperty("stderr");
        expect(result).toHaveProperty("status");
        expect(result).toHaveProperty("pid");
        expect(Buffer.isBuffer(result.stdout)).toBe(true);
    });
});

describe("async spawn from dist", function () {
    let result;

    beforeAll(async function () {
        result = await cp.async("git", ["status"]);
    });

    it("should have all expected properties", function () {
        expect(result).toHaveProperty("output");
        expect(result).toHaveProperty("error");
        expect(result).toHaveProperty("stderr");
        expect(result).toHaveProperty("stdout");
    });

    it("should succeed (error is null)", function () {
        expect(result.error).toBeNull();
    });

    it("should contain git status output", function () {
        expect(result.stdout).toContain("On branch");
    });
});
