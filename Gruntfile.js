/*
 * grunt-esrijso-modulelist
 * https://github.com/lheberlie/grunt-esrijso-modulelist
 *
 * Copyright (c) 2014 Lloyd Heberlie
 * Licensed under the Apache-2.0 license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp/"]
        },

        // Configuration to be run (and then tested).
        esrijso_modulelist: {
            generate: {
                options:{
                    basePath: "test/fixtures/",
                    matchPatterns: ["!*.css", "*.js", "*.html"]
                },
                src: ["**/*.*"],
                dest: {
                    moduleList: "tmp/esrijso-modulelist.txt",
                    moduleByFileList: "tmp/esrijso-modulebyfilelist.txt"
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        }

    })
    ;

// Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

// These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

// Whenever the "test" task is run, first clean the "tmp" dir, then run this
// plugin's task(s), then test the result.
    grunt.registerTask("test", ["clean", "esrijso_modulelist", "nodeunit"]);
    //grunt.registerTask("test", ["clean", "esrijso_modulelist" ]);


// By default, lint and run all tests.
    grunt.registerTask("default", ["jshint", "test"]);

}
;
