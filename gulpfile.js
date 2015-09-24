'use strict';

/*eslint no-use-before-define:0*/

var gulp = require('gulp');
var util = require('gulp-util');
var eslint = require('gulp-eslint');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var publicJsDir = 'source/js';
var publicJsRoot = './' + publicJsDir + '/main.js';
var jsDest = './public/dist';
var jsMin = 'main.min.js';

var jsGlob = ['gulpfile.js', 'app/**/*.js', 'source/**/*.js'];

var lessSrc = 'source/less/main.less';
var lessSrcGlob = ['source/less/**/*.less'];
var lessDest = 'public/dist';

function handleError (error) {
  util.log(error.message);
}

gulp.task('lint', function() {
  return gulp.src(jsGlob)
    .pipe(eslint())
    .on('error', handleError)
    .pipe(eslint.format());
});

gulp.task('browserify', function() {
  var b = browserify({
    entries: [publicJsRoot],
    cache: {},
    packageCache: {},
  })
  .transform(babelify.configure({
    optional: ['es7.objectRestSpread'],
  }), {
    global: true,
  });

  b = watchify(b, {
    delay: 100,
  });

  b.on('update', function () {
    util.log('Starting \'watchify\'');
    bundle();
  });

  b.on('time', function (time) {
    util.log('Finished \'watchify\' after ' + time + ' ms');
  });

  function bundle () {
    return b
      .bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(source(jsMin))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', handleError)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsDest));
  }

  return bundle();
});


gulp.task('less', function () {
  return gulp.src(lessSrc)
    .pipe(less({
      paths: [],
      compress: true
    }))
    .on('error', handleError)
    .pipe(gulp.dest(lessDest));
});

gulp.task('watch', function () {
  gulp.watch(jsGlob, ['lint']);
  gulp.watch(lessSrcGlob, ['build_css']);
});

gulp.task('build', ['build_js', 'build_css']);
gulp.task('build_js', ['lint', 'browserify']);
gulp.task('build_css', ['less']);

gulp.task('default', ['build', 'watch']);

process.on('uncaughtExepction', function (err) {
  util.log(err);
});
