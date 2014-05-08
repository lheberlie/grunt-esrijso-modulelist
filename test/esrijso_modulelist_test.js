"use strict";

var grunt = require("grunt");

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.esrijso_modulelist = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    generate: function (test) {
//        test.expect(1);

//        var actualIndividual = grunt.file.read("tmp/esrijso-modulebyfilelist.txt");
//        var expectedIndividual = grunt.file.read("test/expected/esrijso-modulebyfilelist.txt");
//        test.equal(actualIndividual, expectedIndividual, "should describe what the default behavior is for file by file listing.");

//        test.done();

        test.expect(1);

        var actual = grunt.file.read("tmp/esrijso-modulelist.txt");
        var expected = grunt.file.read("test/expected/esrijso-modulelist.txt");
        test.equal(actual, expected, "should describe what the default behavior is for summary module listing.");

        test.done();
    }
};
