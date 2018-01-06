const Runner = require("nightwatch/lib/runner/run");
const {
  convertNightwatchTestResultsToJestFormat
} = require("./utils/toTestResult");

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
        if (err) {
          workerCallback(err);
          return;
        }

        workerCallback(
          null,
          convertNightwatchTestResultsToJestFormat({
            testFilePath: testPath,
            results
          })
        );

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