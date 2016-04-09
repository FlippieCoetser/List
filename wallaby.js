module.exports = function (wallaby) {
  return {
    files: [
      'src/typescript.list.ts'
    ],
    tests: [
      'test/typescript.list.test.ts'
    ],
    testFramework: 'mocha',
    env: {
        type: 'node'
    },
    debug: true
  };
};