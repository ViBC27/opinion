const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
    testEnvironment: 'node',
    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
    globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
    coveragePathIgnorePatterns: ['node_modules/', '.vscode/', '.git/'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};
