const throat = require('throat');
const pify = require('pify');
const workerFarm = require('worker-farm');
const path = require('path');

const TEST_WORKER_PATH = path.join(__dirname, 'run.js');

class CancelRun extends Error {
  constructor(message) {
    super(message);
    this.name = 'CancelRun';
  }
}

module.exports = class NightwatchRunner {
  constructor(globalConfig) {
    this._globalConfig = globalConfig;
  }

  // eslint-disable-next-line
  runTests(tests, watcher, onStart, onResult, onFailure) {

    debugger;
    const farm = workerFarm(
      {
        autoStart: true,
        maxConcurrentCallsPerWorker: 1,
        maxConcurrentWorkers: this._globalConfig.maxWorkers,
        maxRetries: 2, // Allow for a couple of transient errors.
      },
      TEST_WORKER_PATH,
    );

    //throat - limit parallelism of concurrent functions to maxWorkers
    const mutex = throat(this._globalConfig.maxWorkers);
    //pify — promisify callback function, worker is a promise
    //worker normally is callback based, this makes it a promise
    const worker = pify(farm);

    const runTestInWorker = test =>
      //mutex here is used to limit parallelism
      mutex(() => {
        if (watcher.isInterrupted()) {
          throw new CancelRun();
        }
        return onStart(test).then(() => {
          return worker({
            config: test.context.config,
            globalConfig: this._globalConfig,
            testPath: test.path,
            rawModuleMap: watcher.isWatchMode()
              ? test.context.moduleMap.getRawModuleMap()
              : null,
          });
        });
      });

    const onError = (err, test) => {
      return onFailure(test, err).then(() => {
        if (err.type === 'ProcessTerminatedError') {
          // eslint-disable-next-line no-console
          console.error(
            'A worker process has quit unexpectedly! ' +
              'Most likely this is an initialization error.',
          );
          process.exit(1);
        }
      });
    };

    const onInterrupt = new Promise((_, reject) => {
      watcher.on('change', state => {
        if (state.interrupted) {
          reject(new CancelRun());
        }
      });
    });

    //we can instanciate selenium here.
    //and reuse it across workers
    //by giving selenium handle to the worker,
    //I guess

    const runAllTests = Promise.all(
      tests.map(test =>
        runTestInWorker(test)
          .then(testResult => onResult(test, testResult))
          .catch(error => onError(error, test)),
      ),
    );

    const cleanup = () => workerFarm.end(farm);

    return Promise.race([runAllTests, onInterrupt]).then(cleanup, cleanup);
  }
};