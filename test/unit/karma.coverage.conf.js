var karmaConfig = require('./karma.base');

module.exports = function (config) {
  karmaConfig.reporters = ['spec', 'coverage'];
  karmaConfig.coverageReporter = {
    type: 'html',
    dir: 'coverage/',
  };

  // add plugin 'istanbul' to babel configs for generating coverage report
  karmaConfig.webpack.module.rules[0].use[0].options.plugins.push('istanbul');

  config.set(karmaConfig);
};
