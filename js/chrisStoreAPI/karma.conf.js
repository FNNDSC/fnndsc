var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['src/**/*.test.js'],
    exclude: [],
    preprocessors: {
      'src/**/*.test.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
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
