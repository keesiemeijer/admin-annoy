module.exports = function( grunt ) {

	// Load multiple grunt tasks using globbing patterns
	require( 'load-grunt-tasks' )( grunt );

	'use strict';
	var banner = '/**\n * <%= pkg.homepage %>\n * Copyright (c) <%= grunt.template.today("yyyy") %>\n * This file is generated automatically. Do not edit.\n */\n';
	// Project configuration
	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		uglify: {
			options: {
				banner: '/*\n' +
					' * ' + '<%= pkg.name %>\n' +
					' * ' + 'v<%= pkg.version %>\n' +
					' * ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' **/\n'
			},

			target: {
				files: {
					'admin-annoy.min.js': [ 'admin-annoy.js' ]
				}
			}
		},

		// read version from package.json
		version: {
			readmetxt: {
				options: {
					prefix: 'Stable tag: *'
				},
				src: [ 'readme.txt' ]
			},
			plugin: {
				options: {
					prefix: 'Version: *'
				},
				src: [ 'readme.md', 'admin-annoy.php' ]
			},
		}

	} );


	grunt.registerTask( 'build', [ 'uglify', 'version' ] );

	grunt.util.linefeed = '\n';

};