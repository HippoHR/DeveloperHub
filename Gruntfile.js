module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        lcovMerge: {
            options: {
                outputFile: 'test/all-lcov.info'
            },
            files: ['test/coverage/*/lcov.info']
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-lcov-merge');

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('default', []);

    grunt.registerTask('test', ['karma:unit', 'lcovMerge']);
}
