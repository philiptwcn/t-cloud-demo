const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset, testEnvironment: '@happy-dom/jest-environment' };
