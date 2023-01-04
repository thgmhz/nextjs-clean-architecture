const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/domain/(.*)$': '<rootDir>/core/1.domain/$1',
    '^@/application/(.*)$': '<rootDir>/core/2.application/$1',
    '^@/adapters/(.*)$': '<rootDir>/core/3.adapters/$1',
    '^@/presentation/(.*)$': '<rootDir>/core/4.presentation/$1',
    '^@/infra/(.*)$': '<rootDir>/core/5.infra/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
