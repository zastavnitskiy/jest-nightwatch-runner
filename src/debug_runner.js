const path = require("path");
const run = require("./run");

const testPath = path.resolve("example/simple/tests/search.test.js");

function callback(error, results) {
  console.log('Callback', error, results);
  if (error) {
    console.log(error);
  }
}

run(
  {
    testPath,
    config: {},
    globalConfig: {}
  },
  callback
);