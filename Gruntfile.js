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
        theme:'bikes-on-wheels',
        dist: 'bikes-on-wheels/assets',
        snippets: '../bikes-on-wheels/snippets'
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
            //Staging
            // options: {
            //     api_key: 'ef395c6764a48a68887522090392b090',
            //     password: '0ccdd74708ab1b4c1b0bec0348cc6700',
            //     url: 'bikes-on-wheels-2.myshopify.com',
            //     base: 'bikes-on-wheels/'
            // }
            // ,
            //Production
            options: {
                api_key: '0150d3583f94e054b4cd1e53cadee0f8',
                password: '5a6dce46e094250440715196049e721e',
                url: 'bikes-on-wheels-3.myshopify.com',
                base: 'bikes-on-wheels/',
                theme: '10963799'
            }
        },
    });

    grunt.registerTask('default', [
        'watch'
    ]);
};
