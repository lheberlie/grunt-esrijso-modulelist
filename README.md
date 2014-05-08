# grunt-esrijso-modulelist

Creates a Module List for the [ArcGIS API for JavaScript Web Optimizer](http://jso.arcgis.com/help/).  Searches html and js files in your project to find references to Dojo AMD modules that match any of the following patterns:

```
esri/
dojo/
dojox/
dijit/
xstyle/
put-selector/
dgrid/
```

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git://github.com/lheberlie/grunt-esrijso-modulelist.git --save-dev
```  

* FYI: depending on your network settings, you may need to force Git to clone from **https://** instead of **git://**
	* ```git config --global url.https://.insteadOf git://```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-esrijso-modulelist');
```

## ArcGIS API for JavaScript Optimizer module list task

_Run this task with the `grunt esrijso_modulelist` command._

### Overview
In your project's Gruntfile, add a section named `esrijso_modulelist` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	esrijso_modulelist: {
		your_target: {
			// Target-specific file lists and/or options go here.
			options: {
		      // Task-specific options go here.
		      basePath: "src/",
		      matchPatterns: ["!*.css", "*.js", "*.html"]
			},
		    src: ["**/*.*"],
		    dest: {
			    moduleList: "modules/esrijso-modulelist.txt",
		        moduleByFileList: "modules/esrijso-modulebyfilelist.txt"
		    }
		}
	}
});
```

### Options

#### options.basePath
Type: `String`  
Default value: `undefined`

A string value that is used to specify the directory to look for files.

#### options.matchPatterns
Type: `String` `Array`  
Default value: `["!*.css", "*.js", "*.html"]`

A string array value that is used to specify what files to inspect and which ones to skip.

### Parameters

#### src
Type: `String` `Array`  
Default value: `undefined`

A string array value that is used to specifiy files and directories.

#### dest
Type: ```Object```  
Default value: ```{moduleList: "modules/esrijso-modulelist.txt", moduleByFileList: "modules/esrijso-modulebyfilelist.txt"}```

### Usage Examples

Below you will find samples for a ```Gruntfile.js``` that can be used to run the ```grunt-esrijso-modulelist``` plugin.  These samples also use the ```grunt-contrib-clean``` plugin.

#### Source files are under the root project directory

```js  
"use strict";  

module.exports = function (grunt) {
  
    // Project configuration.
    grunt.initConfig({


        // Before generating any new files, remove any previously-created files.
        clean: {
            module_list: ["modules/"]
        },

        // Configuration to be run (and then tested).
        esrijso_modulelist: {
            generate: {
                options: {
                    basePath: "",
                    matchPatterns: ["!*.css", "*.js", "!Gruntfile.js", "*.html"]
                },
                src: ["*.*","js/**/*.*"],
                dest: {
                    moduleList: "modules/esrijso-modulelist.txt",
                    moduleByFileList: "modules/esrijso-modulebyfilelist.txt"
                }
            }
        }

    });
	// These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-esrijso-modulelist");
  
    grunt.registerTask("generate-module-list", ["clean", "esrijso_modulelist" ]);

	// By default, run the generate-module-list task.
    grunt.registerTask("default", ["generate-module-list"]);
};
```

#### Source files are under a directory named ```src```

In this example, the ```generate``` target is used to traverse the ```src``` directory of your project directory specified by the ```basePath``` option. The ```matchPatterns``` option tells the plugin what files to look for and which ones to skip.  The ```src``` parameter specifies to look for all files in all directories and subdirectories.  The ```dest``` parameter specifies where and what name to give the files created that will contain a list of modules by each file type if there are multiple files, and the single comprehensive module list file.

```js
"use strict";  

module.exports = function (grunt) {
  
    // Project configuration.
	grunt.initConfig({
		esrijso_modulelist: {
			generate: {
			    options:{
			        basePath: "src/",
			        // Ignore css files since they don't have Dojo require AMD statements
					// Include any file types you want ignored
			        matchPatterns: ["!*.css", "*.js", "*.html"]
			    },
			    // Search for all files, in all directories and subdirectories,
			    // the matchPatterns will exclude any files we're not interested in inspecting
			    src: ["**/*.*"],
	   		    // Tell the plugin where we want to write out our results
			    dest: {
			        moduleList: "tmp/esrijso-modulelist.txt",
			        moduleByFileList: "tmp/esrijso-modulebyfilelist.txt"
			    }
			}
		}
	});
	// These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-esrijso-modulelist");
  
    grunt.registerTask("generate-module-list", ["clean", "esrijso_modulelist" ]);

	// By default, run the generate-module-list task.
    grunt.registerTask("default", ["generate-module-list"]);
};
```

#### Example output ```esrijso-modulelist.txt```

```  
dgrid/Grid
dijit/form/Button
dijit/form/FilteringSelect
dijit/form/Textarea
dijit/layout/BorderContainer
dijit/layout/ContentPane
dijit/registry
dojo/_base/array
dojo/data/ItemFileReadStore
dojo/dom
dojo/dom-construct
dojo/dom-style
dojo/domReady!
dojo/json
dojo/number
dojo/on
dojo/parser
dojo/ready
esri/arcgis/Portal
esri/Color
esri/config
esri/dijit/editing/AttachmentEditor
esri/dijit/HistogramTimeSlider
esri/dijit/Legend
esri/graphic
esri/InfoTemplate
esri/lang
esri/layers/ArcGISDynamicMapServiceLayer
esri/layers/ArcGISTiledMapServiceLayer
esri/layers/FeatureLayer
esri/layers/LayerDrawingOptions
esri/map
esri/request
esri/symbols/Font
esri/symbols/SimpleFillSymbol
esri/symbols/SimpleMarkerSymbol
esri/symbols/TextSymbol
esri/tasks/AlgorithmicColorRamp
esri/tasks/ClassBreaksDefinition
esri/tasks/GenerateRendererParameters
esri/tasks/GenerateRendererTask
esri/tasks/locator  
```

## Release History
View the [releases](../../releases)

## Issues
Find a bug or want to request a new feature?  Please let us know by [submitting an issue](../../issues).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

We welcome [contributions](CONTRIBUTING.md) from anyone and everyone.

## Licensing
Copyright (c) 2014 Lloyd Heberlie  
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](license.txt) file.
