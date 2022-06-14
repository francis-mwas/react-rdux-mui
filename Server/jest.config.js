/**
 *
 * Jest configuration file
 */
module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: 'tests',
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testTimeout: 30000,
};
