/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  collectCoverageFrom: ['src/**/*.ts', '!src/entities/*.ts', '!build/**/*.ts'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  detectOpenHandles: true,
};
