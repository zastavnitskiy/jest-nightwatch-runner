const Runner = require("nightwatch/lib/runner/run");

const run = ({ config, testPath, globalConfig }, workerCallback) => {
  const onEnd = () => {
    process.on("exit", () => process.exit());
  };

  const tests = [
    {
      duration: 3000
    }
  ];

  try {
    var runner = new Runner(
      [testPath],
      {
        seleniumPort: 4444,
        silent: true,
        output: false
      },
      {
        output_folder: false,
        start_session: true
      },
      function(err, results) {
        const modules = Object.keys(results.modules).map(
          moduleName => results.modules[moduleName]
        );
        const tests = Object.keys(modules[0].completed).map(
          testName => modules[0].completed[testName]
        );

        const testResults = tests.reduce((memo, test) => {
          return memo.concat(
            test.assertions.map(assertion => {
              return {
                ancestorTitles: [],
                duration: 0,
                failureMessages: assertion.failure,
                fullName: assertion.message,
                numPassingAsserts: Boolean(assertion.failure) ? 1 : 0,
                status: Boolean(assertion.failure) ? "failed" : "passed",
                title: assertion.message
              };
            })
          );
        }, []);

        workerCallback(null, {
          console: null,
          failureMessage: err && err.message,
          numFailingTests: results.failed,
          numPassingTests: results.passed,
          numPendingTests: 0,
          perfStats: {
            end: +new Date(),
            start: +new Date()
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
          testFilePath: testPath,
          testResults
        });
      }
    );

    runner.run().catch(function(err) {
      workerCallback(err);
    });
  } catch (e) {
    workerCallback(e);
  }
};

module.exports = run;