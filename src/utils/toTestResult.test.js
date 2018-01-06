
const {convertNightwatchTestResultsToJestFormat} = require('./toTestResult');

const nightwatchTestResults = {
  passed: 7,
  failed: 1,
  errors: 0,
  skipped: 0,
  tests: 8,
  errmessages: [],
  modules: {
    "search.test": {
      completed: {
        "Search no dates": {
          passed: 5,
          failed: 0,
          errors: 0,
          skipped: 0,
          assertions: [
            {
              message: "Element <body> was visible after 139 milliseconds.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            },
            {
              message: "Testing if element <#frm> is visible.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            },
            {
              message:
                "Element <.c-autocomplete__item> was present after 14 milliseconds.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            },
            {
              message:
                "Element <.sr_item> was visible after 3128 milliseconds.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            },
            {
              message: "Testing if element <.sr_item> is present.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            }
          ],
          timeMs: 11235,
          time: "11.23"
        },
        "Index page": {
          passed: 2,
          failed: 1,
          errors: 0,
          skipped: 0,
          assertions: [
            {
              message: "Element <body> was visible after 121 milliseconds.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            },
            {
              message: "Testing if element <#frm> is visible.",
              stackTrace: "",
              fullMsg: "",
              failure: false
            },
            {
              message: "Testing if element <.sr_item> is present.",
              stackTrace:
                "    at Object.Index page (/Users/pzastavnitskiy/Projects/jest-nightwatch-runner/example/simple/tests/search.test.js:21:15)\n    at Module.call (/Users/pzastavnitskiy/Projects/nightwatch/lib/runner/module.js:62:34)\n    at /Users/pzastavnitskiy/Projects/nightwatch/lib/runner/testcase.js:70:29\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)",
              fullMsg: "Testing if element <.sr_item> is present.",
              failure: 'Expected "present" but got: "not present"'
            }
          ],
          timeMs: 2081,
          time: "2.081"
        }
      },
      skipped: [],
      time: "13.32",
      timestamp: "Sat, 06 Jan 2018 20:07:24 GMT",
      group: "",
      tests: 2,
      errmessages: [],
      failures: 1,
      errors: 0
    }
  },
  assertions: 8
};

test('converting nightwatch results to jest', () => {
  const testFilePath = 'test-path';
  const result = convertNightwatchTestResultsToJestFormat({testFilePath, results: nightwatchTestResults});

  expect(result.numFailingTests).toEqual(1);
  expect(result.numPassingTests).toEqual(1);
  expect(result.numPendingTests).toEqual(0);
  expect(result.failureMessage).toEqual('');
  expect(result.testResults).toBeDefined();
  expect(result.testResults.length).toEqual(result.numPendingTests + result.numPassingTests + result.numFailingTests);

  expect(result.snapshot).toBeDefined();
  expect(result.testFilePath).toBeDefined();
  expect(result.testFilePath).toEqual(testFilePath);
  

})