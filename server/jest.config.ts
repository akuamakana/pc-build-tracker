import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  collectCoverageFrom: ['src/**/*.ts', '!src/entities/*.ts', '!build/**/*.js', '!src/index.ts'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  detectOpenHandles: true,
  moduleNameMapper: {
    '@lib/(.*)$': '<rootDir>/src/lib/$1',
    '@routes': '<rootDir>/src/routes/index.ts',
    '@entities/(.*)$': '<rootDir>/src/entities/$1',
    '@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '@src/(.*)$': '<rootDir>/src/$1',
  },
  // globals: {
  //   'ts-jest': {
  //     astTransformers: {
  //       before: ['ts-jest/dist/transformers/path-mapping'],
  //     },
  //   },
  // },
};

export default config;
