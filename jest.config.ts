import type { Config } from 'jest';

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  clearMocks: true,
  randomize: true,
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};

export default config;