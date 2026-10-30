'use strict';

import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
const pathKey = require('../src/lib/util/pathKey')();
import crossSpawn from '../src/index';

describe('async', () => {
  const originalPathEnv = process.env[pathKey];

  beforeAll(() => mkdirp.sync(`${__dirname}/tmp`));

  afterAll(() => rimraf.sync(`${__dirname}/tmp`));

  afterEach(() => {
    jest.restoreAllMocks();
    process.env[pathKey] = originalPathEnv;
  });

  it('should have stdout, stderr, and err property', async () => {
    const child = await crossSpawn.async('echo', ['hello', 'world']);

    expect(child).toHaveProperty('stdout');
    expect(child).toHaveProperty('stderr');
    expect(child).toHaveProperty('err');

    expect(typeof child.stdout).toBe('string');
    expect(typeof child.stderr).toBe('string');
    expect(child.err === null).toBe(true);
  });
});
