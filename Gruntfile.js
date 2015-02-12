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

module.exports = function(grunt) {

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
			tests: ["tmp"]
		},

		// Configuration to be run (and then tested).
		image_debower: {
			no_icons: {
				expand: true,
				cwd: "test/fixtures/no_icons",
				src: [ "*.html" ],
				dest: "tmp/no_icons",
				srcImages: "test/fixtures/images",
				destImages: "tmp/no_icons/images"
			},
			with_icons: {
				expand: true,
				cwd: "test/fixtures/with_icons",
				src: [ "*.html" ],
				dest: "tmp/with_icons",
				srcImages: "test/fixtures/images",
				destImages: "tmp/with_icons/images"
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ["test/*_test.js"]
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks("tasks");

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask("test", ["clean", "image_debower", "nodeunit"]);

	// By default, lint and run all tests.
	grunt.registerTask("default", ["jshint", "test"]);
};
