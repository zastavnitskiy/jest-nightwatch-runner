

const jestTemplate = {
  coverage: null,
  console: null,
  failureMessage: "Failure message",
  numFailingTests: 1,
  numPassingTests: 2,
  numPendingTests: 3,
  perfStats: {
    end: +new Date(1),
    start: +new Date(2)
  },
  skipped: false,
  snapshot: {
    added: 0,
    fileDeleted: false,
    matched: 0,
    unchecked: 0,
    unmatched: 0,
    updated: 0
  },
  sourceMaps: {},
  testExecError: null,
  testFilePath: 'jestTestPath',
  testResults: [
    {
      ancestorTitles: [],
      duration:  1000,
      failureMessages: 'toMochaError(test)',
      fullName: 'test.fullTitle()',
      numPassingAsserts: 0,
      status:  "passed",
      title: 'test.title'
    }
  ]
};

function convertNightwatchTestResultsToJestFormat({
  results,
  testFilePath
}) {
  const { modules } = results;

  const suiteName = Object.keys(modules)[0];
  const suite = modules[suiteName];
  const numFailingTests = suite.failures;
  const numPassingTests = suite.tests - suite.failures;
  const numPendingTests = 0;
  const failureMessage = "";
  const testResults = Object.keys(suite.completed).map(testName => {
    const test = suite.completed[testName];

    return {
      ancestorTitles: [],
      duration: test.timeMs,
      failureMessages: "toMochaError(test)",
      fullName: testName,
      numPassingAsserts: test.passed,
      status: test.failed ? "failed" : "passed",
      title: testName
    };
  });

  const start = new Date(suite.timestamp);
  const end = new Date(suite.timestamp);
  end.setSeconds(end.getSeconds() + suite.time);

  return {
    coverage: null,
    console: null,
    failureMessage,
    numFailingTests,
    numPassingTests,
    numPendingTests,
    testResults,
    testFilePath,
    perfStats: {
      end,
      start
    },
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      unmatched: 0,
      updated: 0
    }
  };
};

exports.convertNightwatchTestResultsToJestFormat = convertNightwatchTestResultsToJestFormat;