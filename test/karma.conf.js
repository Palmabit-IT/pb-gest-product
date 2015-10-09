module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['Chrome'],

    files: [
      '../src/*.js',
      '../src/**/*.js',
      'SpecHelper.js',
      'unit/**/*.js',
      'unit/*.js'
    ]
  });
};
