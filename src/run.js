// const Mocha = require('mocha');
// const toTestResult = require('./utils/toTestResult');
// const setupCollectCoverage = require('./utils/setupCollectCoverage');
// const getMochaOptions = require('./utils/getMochaOptions');

const run = ({ config, testPath, globalConfig }, workerCallback) => {
  //run nightwatch for a file
  //cleanup output
  //call callback


  const onEnd = () => {
    process.on('exit', () => process.exit());
  };

  const tests = [{
    duration: 3000
  }]

  try {
    workerCallback(null, {
    console: null,
    failureMessage: "getFailureMessages(tests)",
    numFailingTests: 1,
    numPassingTests: 2,
    numPendingTests: 3,
    perfStats: {
      end: +new Date(),
      start: +new Date(),
    },
    skipped: false,
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      unmatched: 0,
      updated: 0,
    },
    sourceMaps: {},
    testExecError: null,
    testFilePath: testPath,
    testResults: tests.map(test => {
      return {
        ancestorTitles: [],
        duration: 1000,
        failureMessages: "toMochaError(test)",
        fullName: "test.fullTitle()",
        numPassingAsserts: "hasError(test)" ? 1 : 0,
        status: "hasError(test)" ? 'failed' : 'passed',
        title: "test.title",
      };
    }),
  })
  } catch (e) {
    workerCallback(e);
  }
};

module.exports = run;