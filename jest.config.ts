import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  clearMocks: true,
  randomize: true
};

export default config;