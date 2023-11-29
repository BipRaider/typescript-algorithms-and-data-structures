import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Indicates whether each individual test should be reported during the run.
  verbose: true,
  displayName: {
    name: 'apps',
    color: 'yellowBright',
  },
  // The bail config option can be used here to have Jest stop running tests after
  // the first failure.
  bail: false,

  // test files
  testMatch: [
    '<rootDir>/**/*.(test|spec).{js,jsx,ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  // The pattern Jest uses to detect test files.
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',

  // coverage
  roots: ['<rootDir>'],
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // The directory where Jest should output its coverage files.
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['**/*.(t|j)s', '!src/test/utils/*.ts', '!src/interfaces/*.ts'],

  // this list paths from tsconfig.json
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js', 'json', 'node', 'jsx', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],

  // setup
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  // globalSetup: '<rootDir>/src/test/globalSetup.ts',
  // globalTeardown: '<rootDir>/src/test/globalTeardown.ts',

  // // transform
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
  },

  //Env data
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },

  //Ignore files or folder
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/test/utils/*.ts', '<rootDir>/src/interfaces/*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/test/utils/*.ts', '<rootDir>/src/interfaces/*.ts'],
  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/test/utils/*.ts', '<rootDir>/src/interfaces/*.ts'],
};

export default config;
