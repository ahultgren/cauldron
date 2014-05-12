'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        globalstrict: true,
        camelcase: true,
        indent: 2,
        immed: true,
        latedef: 'nofunc',
        newcap: true,
        quotmark: true,
        undef: true,
        //unused: true,
        trailing: true,
        browser: true,
        globals: {
          console: true,
          require: true,
          exports: true,
          module: true
        }
      },
      gruntfile: {
        options: {
          node: true
        },
        src: 'Gruntfile.js'
      },
      server: {
        src: ['app.js', 'routes/**/*.js'],
        options: {
          node: true
        }
      },
      js: {
        src: ['public/javascripts/**/*.js', '!public/javascripts/engine/vendor/**/*.js'],
        options: {
          unused: true
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'public/dist/main.js': ['public/javascripts/**/*.js', '!public/javascripts/engine/vendor/**/*.js']
        },
        options: {
          shim: {
            jquery: {
              path: 'public/javascripts/engine/vendor/jquery.min.js',
              exports: 'jQuery'
            },
            sat: {
              path: 'public/javascripts/engine/vendor/sat.min.js',
              exports: 'SAT'
            },
            peerjs: {
              path: 'public/javascripts/engine/vendor/peerjs.min.js',
              exports: 'Peer'
            }
          }
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['build']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['build_js']
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task
  grunt.registerTask('build_js', ['jshint', 'browserify']);
  grunt.registerTask('build', ['build_js']);
  grunt.registerTask('default', ['build', 'watch']);
};
