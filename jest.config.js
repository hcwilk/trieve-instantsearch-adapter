/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
preset: 'ts-jest',
testEnvironment: 'node',
rootDir: './',
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  setupFiles: ['dotenv/config'],
};
