export default {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dst/'],
  // collectCoverage: true,
}