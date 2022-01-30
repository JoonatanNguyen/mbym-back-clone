module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[t]s?(x)'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/models/**',
    '!src/data/**',
    '!src/database/**',
    '!src/responses/**',
    '!src/routes/**',
    '!src/controllers/**',
    '!src/configs/**',
    '!src/server.js',
    '!src/services/RollbarLoggerService.js',
    '!src/constants/**',
    '!src/validators/**'
  ]
};
