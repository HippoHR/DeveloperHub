'use strict';

// Karma configuration

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // Include the general required utils
            'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
            'javascripts/external/**/*.js',
            'javascripts/api-clients/*.js',
            'javascripts/layout/*.js',
            // The controllers depend on these files, so we need to include them first before including the controllers
            'javascripts/job-module/job-module.js',
            // Recruiter is required by the jobwidget form
            'javascripts/widgets/recruiter.js',
            'javascripts/widgets/job.js',
            'javascripts/widgets/search.js',
            // Include all other javascripts, that are no dependencies
            'javascripts/**/*.js',
            // Include the tests
            'test/spec/javascripts/**/*.js'
        ],

        exclude: [
            // These controllers are coupled too close to the view, which results into errors
            // https://github.com/TeamYellowYellow/for-developers/issues/7
            'javascripts/job-module/search-form-controller.js',
            'javascripts/jobs-xml/*.js'
        ],

        // test results reporter to use
        reporters: ['progress', 'coverage', 'sonarqubeUnit', 'junit'],

        // coverage
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            // exclude the external files
            'javascripts/!(external)/**/*.js': ['coverage']
        },

        coverageReporter: {
            // lcov and html
            type: 'lcov',
            dir: 'test/coverage/'
        },

        junitReporter: {
          outputDir: '',
          outputFile: 'junit.xml',
          useBrowserName: false
        },

        sonarQubeUnitReporter: {
            outputDir: 'test',
            outputFile: 'ut_report.xml',
            useBrowserName: false,
            filenameFormatter: function(path) {
                return 'test/' + path.replace(/\./g, '/') + '.js';
            },
            testnameFormatter: function(testname, result) {
                var prefixName = '';
                // Skip the first prefix (index 0), because it is the filename
                for(var i = 1, l = result.suite.length; i < l; i++) {
                    prefixName += result.suite[i] + ' ';
                }
                return prefixName + testname;
            }
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    })
}
