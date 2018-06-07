var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['src/**/*.test.ts'],
    exclude: [],
    preprocessors: {
      // 'app.js': ['webpack'],
      'src/**/*.test.ts': ['webpack'],
    },
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    browserDisconnectTimeout: 10000,
    concurrency: Infinity,
  });
};
