module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ["default",
    ["jest-junit", {
      output: "./test-results/jest/results.xml"
    }]
  ]
};