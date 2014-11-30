// Generated on 2014-06-04 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    // Add shopify theme url here
    var config = {
        app: 'app',
        theme:'sell-in-may',
        dist: 'sell-in-may/assets',
        snippets: '../sell-in-may/snippets'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            shopify: {
                files: [
                    '<%= config.theme %>/config/**',
                    '<%= config.theme %>/assets/**',
                    '<%= config.theme %>/snippets/**',
                    '<%= config.theme %>/layout/**',
                    '<%= config.theme %>/templates/**'
                ],
                tasks: ['shopify']
            }
        },


        shopify: {
            options: {
                api_key: '0c7edac103cecdb0bf26c8305841a199',
                password: 'f7d4445540967af654f78d13d594eedc',
                url: 'sell-in-may.myshopify.com',
                base: 'sell-in-may/'
            //    theme: '10963799'
            }
        },
    });

    grunt.registerTask('default', [
        'watch'
    ]);
};
