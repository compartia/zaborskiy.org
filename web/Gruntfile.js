module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        sass: {
            dist: {
                files: {
                    'assets/css/zaborskiy.css': 'assets/scss/zaborskiy.scss',
                    'assets/css/tutorial.css': 'assets/scss/tutorial.scss'
                }
            }
        },

        watch: {

            css: {
                files: 'assets/scss/*.scss',
                tasks: ['sass']
            }


        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'sass']);

};
