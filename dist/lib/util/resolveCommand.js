'use strict';
var path = require('path');
var which = require('which');
var getPathKey = require('path-key');
function resolveCommandAttempt(parsed, withoutPathExt) {
    var env = parsed.options.env || process.env;
    var cwd = process.cwd();
    var hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    var shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;
    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) {
        try {
            process.chdir(parsed.options.cwd);
        }
        catch (err) {
            /* Empty */
        }
    }
    var resolved;
    try {
        resolved = which.sync(parsed.command, {
            path: env[getPathKey({ env: env })],
            pathExt: withoutPathExt ? path.delimiter : undefined,
        });
    }
    catch (e) {
        /* Empty */
    }
    finally {
        if (shouldSwitchCwd) {
            process.chdir(cwd);
        }
    }
    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }
    return resolved;
}
function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
module.exports = resolveCommand;
