'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');


var clientJsDir = 'public/javascripts';
var clientJsRoot = clientJsDir + '/main.js';
var clientJsDest = 'public/dist';
var clientJsMin = 'main.min.js';

var serverJsGlob = ['package.json', 'gulpfile.js', 'app.js', 'bin/*.js'];

var lessSrc = 'public/less/main.less';
var lessSrcGlob = 'public/less/**/*.less';
var lessDest = 'public/dist';


gulp.task('lint', function() {
  gulp.src([clientJsDir + '/**/*.js'])
    .pipe(jshint({
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
      unused: true,
      trailing: true,
      browser: true,
      node: true
    }))
    .on('error', handleError)
    .pipe(jshint.reporter('jshint-stylish'));

  gulp.src(serverJsGlob)
    .pipe(jshint({
      node: true
    }))
    .on('error', handleError)
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  gulp.src(clientJsRoot)
    .pipe(browserify({
      shim: {
        peerjs: {
          path: 'node_modules/peerjs/dist/peer.min.js',
          exports: 'Peer'
        }
      },
      transform: ['brfs']
    }))
    .on('error', handleError)
    .pipe(uglify())
    .pipe(rename(clientJsMin))
    .pipe(gulp.dest(clientJsDest));
});

gulp.task('less', function () {
  gulp.src(lessSrc)
    .pipe(less({
      paths: [],
      compress: true
    }))
    .on('error', handleError)
    .pipe(gulp.dest(lessDest));
});

gulp.task('watch', function () {
  gulp.watch([clientJsDir + '/**/*.js'], ['build_js']);
  gulp.watch(serverJsGlob, ['lint']);
  gulp.watch(lessSrcGlob, ['build_css']);
});

gulp.task('build', ['build_js', 'build_css']);
gulp.task('build_js', ['lint', 'browserify']);
gulp.task('build_css', ['less']);

gulp.task('default', ['build', 'watch']);


/* Helpers
============================================================================= */

function handleError (error) {
  util.log(error.message);
}
