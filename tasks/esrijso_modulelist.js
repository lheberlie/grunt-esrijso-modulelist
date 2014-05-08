/*
 * grunt-esrijso-modulelist
 * https://github.com/lheberlie/grunt-esrijso-modulelist
 *
 * Copyright (c) 2014 Lloyd Heberlie
 * Licensed under the Apache-2.0 license.
 */

"use strict";

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask("esrijso_modulelist", "Creates a Module List for the ArcGIS API for JavaScript Web Optimizer.", function () {
        // Merge task-specific and/or target-specific options with these defaults.

        var options = this.options({
            matchBase: true,
            matchPatterns: ["!*.css", "*.js", "*.html"]
        });
        var done = this.async();
        var path = require("path");

        // String of concatenated modules to be written to file for modules by file type (*.js, *.html)
        var moduleContents = "";
        // String of concatentated modules to be written to file for all unique modules in a project
        var moduleContentsByFile = "";

        // Array to hold unique modules for entire project
        var modulesArray = [];
        // Dictionary or Plain Object to hold all modules by file type (*.js, *.html)
        var modulesByFileDict = {};
        var moduleCount = 0;

        // RegEx patterns to match Dojo and esrijs AMD modules
        var patternMatchModule = /"(esri|dojo|dojox|dijit|xstyle|put-selector|dgrid)\/{1,}([\/a-zA-Z0-9_!\-]+)"/m;
        var patternMatchModuleAll = /"(esri|dojo|dojox|dijit|xstyle|put-selector|dgrid)\/{1,}([\/a-zA-Z0-9_\-!]+)"/g;

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            //grunt.log.writeln(JSON.stringify(file));
            var files;
            // check to see if src has been set
            if (typeof file.src === "undefined") {
                grunt.fatal("Need to specify which files to inspect for the module lists (src).");
            }

            if (options.basePath) {
                files = grunt.file.expand({cwd: options.basePath}, file.orig.src);
                //grunt.log.writeln(JSON.stringify(files));
            } else {
                files = file.src;
            }

            // Exclude files
            if (options.matchPatterns) {
                // Filter the files we want to search
                // The directories we're given may have all types of files,
                // but we're only really interested in *.js and *.html since we're looking for dojo require statements
                files = grunt.file.match(options, options.matchPatterns, files);
            }


            if (files) {
                files.forEach(function (item) {
                    var fullFile = path.join(options.basePath, item);
                    modulesByFileDict["module" + moduleCount] = "\n#" + fullFile;
                    moduleCount++;
                    if (!grunt.file.exists(fullFile)) {
                        grunt.log.warn("File " + fullFile + " not found.");
                    }
                    else {
                        grunt.log.writeln("Processing file: " + fullFile);
                        var searchFile = grunt.file.read(fullFile);
                        var searchFileArray = searchFile.split("\n");

                        searchFileArray.forEach(function (searchFileItem) {
                            if (patternMatchModule.test(searchFileItem)) {
                                //grunt.log.writeln("SFI: " + searchFileItem);

                                var matchArr, i;
                                while ((matchArr = patternMatchModuleAll.exec(searchFileItem))) {
                                    for (i = 0; i < matchArr.length; i += 1) {
                                        if (i === 0) {
                                            //grunt.log.writeln("// [" + i + "] " + matchArr[i]);
                                            var key = matchArr[i];
                                            var cleanKey = key.substring(1, key.length - 1);
                                            modulesArray.push(cleanKey);
                                            modulesByFileDict["module" + Math.random() * (10000 - 1) + 1] = cleanKey;
                                        }
                                    }
                                }

                            }
                        });
                    }
                });

                modulesArray.sort(function (a, b) {
                    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
                });

                var uniqueDict = {};

                modulesArray = modulesArray.filter(function (filterItem) {
                    if (!uniqueDict.hasOwnProperty(filterItem)) {
                        uniqueDict[filterItem] = filterItem;
                        return true;
                    }
                    else {
                        return false;
                    }

                });
                for (var i = 0; i < modulesArray.length; i++) {
                    moduleContents += modulesArray[i] + "\n";
                }

                for (var itemsByFileKey in modulesByFileDict) {
                    moduleContentsByFile += modulesByFileDict[itemsByFileKey] + "\n";
                }
            }

            if(!file.dest.moduleByFileList){
                file.dest.moduleByFileList = "modules/esrijso-modulebyfilelist.txt";
            }

            if(!file.dest.moduleList){
                file.dest.moduleList = "modules/esrijso-modulelist.txt";
            }

            grunt.file.write(file.dest.moduleByFileList, moduleContentsByFile);

            grunt.log.writeln("File \"" + file.dest.moduleByFileList + "\" created. ");

            grunt.file.write(file.dest.moduleList, moduleContents);

            grunt.log.writeln("File \"" + file.dest.moduleList + "\" created. ");


            done();
        });
    });

};
