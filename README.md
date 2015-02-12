# grunt-image-debower [![Build Status](https://travis-ci.org/MJDSys/grunt-image-debower.svg)](https://travis-ci.org/MJDSys/grunt-image-debower)  [![Dependency Status](https://david-dm.org/MJDSys/grunt-image-debower.svg)](https://david-dm.org/MJDSys/grunt-image-debower)  [![devDependency Status](https://david-dm.org/MJDSys/grunt-image-debower/dev-status.svg)](https://david-dm.org/MJDSys/grunt-image-debower#info=devDependencies)  [![peerDependency Status](https://david-dm.org/MJDSys/grunt-image-debower/peer-status.svg)](https://david-dm.org/MJDSys/grunt-image-debower#info=peerDependencies)

> Copies images from a bower repository based upon what is included in html files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-debower --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-debower');
```

## The "image_debower" task

### Overview
In your project's Gruntfile, add a section named `image_debower` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	image_debower: {
		your_target: {
			// Target-specific file lists and/or options go here.
		},
	},
});
```

### Options

#### target.src
Type: `String`
Default value: `''`

The source html files to operate on.

#### dest
Type: `String`
Default value: `''`

Where to store the resulting files.

#### srcImages
Type: `String`
Default value: `''`

Where to find the images to copy into the destination.

#### destImages
Type: `String`
Default value: `''`

Where to store the used images.  By default, each bower package will get its own folder under here to avoid interpackage conflicts.

### Usage Examples



```js
grunt.initConfig({
	image_debower: {
		dist {
			expand: true,
			cwd: 'dist',
			src: [ '**/*.html' ],
			dest: 'dist',
			srcImages: 'app',
			destImages: 'dist/images'
		}
	},
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.3
 - Add support for the `<img>` and `<object>` tags.

0.0.2
 - Update documentation to include a better example.
 - Include grunt-cli in development dependencies, to ensure npm test works.

0.0.1
 - Initial experimental release.  Works so far for my purproses.
