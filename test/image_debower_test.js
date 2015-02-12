/*
 * grunt-image-debower: Grunt plugin to copy images out of bower directories
 * Copyright (C) 2015  Matthew Dawson <matthew@mjdsystems.ca>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

"use strict";

var ndd = require("node-dir-diff"),
	path = require("path");

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

exports.image_debower = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	no_icons: function(test) {
		test.expect(1);

		var dd = new ndd.Dir_Diff([
			path.resolve("tmp/no_icons"),
			path.resolve("test/expected/no_icons")
		], "content" );

		dd.compare(function(err, result) {
			test.equal(result.deviation, 0, "When no icons are given, the html should be unmodified.");
			test.done();
		});
	},
	with_icons: function(test) {
		test.expect(1);

		var dd = new ndd.Dir_Diff([
			path.resolve("tmp/with_icons"),
			path.resolve("test/expected/with_icons")
		], "content" );

		dd.compare(function(err, result) {
			test.equal(result.deviation, 0, "When icons are given, the html should be modified as appropriate, with images copied in.");
			test.done();
		});
	},
};
