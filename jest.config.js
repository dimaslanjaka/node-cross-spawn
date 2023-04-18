"use strict";

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transformIgnorePatterns: [
        "node_modules",
        "node_modules/path-key/index.js",
        "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
        require.resolve("path-key")
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        "path-key": "babel-jest",
    },
    moduleNameMapper: {
        "^path-key$": require.resolve("path-key"),
    },
};

module.exports = config;
