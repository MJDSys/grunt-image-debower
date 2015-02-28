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
	var cheerio = require("cheerio");

	var srcReplace = function($, file, attrName) {
		return function(_, image) {
			image = $(image);

			var origPath = image.attr(attrName);
			var regexp = /\/bower_components\/([^\/]*)\/.*\/(.*)/;
			var matches = regexp.exec(origPath);
			var newPath = file.destImages + "/" + matches[1] + "/" + matches[2];

			grunt.file.copy(file.srcImages + origPath, newPath);

			if (newPath.indexOf(file.orig.dest) === 0) {
				newPath = newPath.substr(file.orig.dest.length);
			}
			image.attr(attrName, newPath);
		}
	}

	var processFile = function(file) {
		return function(contents) {
			var $ = cheerio.load(contents);
			$("md-icon").each(srcReplace($, file, "icon"));
			$("img").each(srcReplace($, file, "src"));
			$("object").each(srcReplace($, file, "data"));
			return $.html();
		};
	};

	grunt.registerMultiTask("image_debower", "Imager thing", function() {
		this.files.forEach(function(file) {
			grunt.file.copy(file.src[0], file.dest, { process: processFile(file) });
		});
	});
};
