module.exports = function (config) {

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [{ pattern: './karma.runner.js', watched: false }],
    preprocessors: { './karma.runner.js': ['webpack', 'sourcemap'] },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.ts$/, use: ['ts-loader'] },
        ]
      },
      resolve: {
        extensions: ['.js', '.ts']
      }
    },
    webpackMiddleware: {
      stats: {
        assets: false,
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        children: false,
      },
    },
    webpackServer: { noInfo: false },

    reporters: ['mocha', 'dots'],
    mochaReporter: {
      output: 'minimal'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,

    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 60000,
    customLaunchers: {
      PhantomDebug: { // used by npm script 'test:watch:phantom'
        base: 'PhantomJS',
        debug: true
      },
      ChromeDebug: { // used by npm script 'test:watch'
        base: 'Chrome',
        flags: ['--remote-debugging-port=9222']
      }
    },
    autoWatch: false,
    autoWatchBatchDelay: 250,
    singleRun: true
  });
};
