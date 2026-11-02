'use strict';

const cp = require('../dist/index.cjs');

describe('dist CJS bundle', () => {
  it('should export default spawn function', () => {
    expect(typeof cp).toBe('function');
  });

  it('should export spawnSync function', () => {
    expect(typeof cp.spawnSync).toBe('function');
  });
});

describe('spawnSync from dist', () => {
  it('should execute git status successfully', () => {
    const result = cp.spawnSync('git', ['status']);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('stdout');
    expect(result).toHaveProperty('stderr');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('pid');
    expect(Buffer.isBuffer(result.stdout)).toBe(true);
  });
});
