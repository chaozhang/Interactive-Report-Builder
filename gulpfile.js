var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');
var jquery      = require('gulp-jquery');
var del         = require('del');
var browserify  = require("browserify");
var babelify    = require("babelify");
var source      = require("vinyl-source-stream");
var browserSync = require("browser-sync");
var stylus      = require('gulp-stylus');
var nib         = require('nib');

var paths = {
  assets: './assets',
  src: './src',
  output: './www',
  npm: './node_modules'
};

// deploy to prod server
gulp.task('deploy', function() {
  gulp.src(paths.output + '/**/*')
    .pipe(deploy())
});

// build app js
gulp.task('app:js', function () {
  browserify({
    entries: paths.src + '/js/app/app.es6',
    debug: true
  })
  .transform(babelify.configure({
    optional: ["es7.classProperties"]
  }))
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(paths.output + '/js'));
});

// build index html file
gulp.task('app:html', function () {
  gulp.src(paths.src + '/index.html')
    .pipe(gulp.dest(paths.output))
});

// build app css
gulp.task('app:css', function() {
  gulp.src(paths.src + '/stylus/app.styl')
    .pipe(stylus({
      'include css': true,
      use: [nib()], 
      errors: true
    }))
    .pipe(gulp.dest(paths.output + '/css'));
});

// build app assets
gulp.task('app:assets', function() {
  gulp.src(paths.assets + '/**/*')
    .pipe(gulp.dest(paths.output + '/assets'));
});

// default build process
gulp.task('default', ['app:js', 'app:html', 'app:css', 'app:assets'], function(){
  console.log('done: add gulp watch here');
});

// local web http server - browserSync
gulp.task('server', function () {
  browserSync({
    open: false,
    server: {
      baseDir: paths.output
    }
  });
});

// clean up
gulp.task('clean', function (cb) {
  del([
    paths.output + '/**/*',
    paths.npm
  ], cb);
});
