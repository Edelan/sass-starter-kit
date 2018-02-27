let gulp = require('gulp');
let sass = require('gulp-sass');
let autoPrefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let pump = require('pump');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

let sassSrc = 'scss/ssk.scss';
let cssDest = 'assets/css';

let watchSrc = ['scss/*.scss', 'scss/*/*.scss'];

let cb = function(err) {
  if(err) {
    console.log('Error:', err.toString());
  }
}


// Workflow css

gulp.task('styles' , function(cb){
  pump([
    gulp.src(sassSrc),
    sass(),
    autoPrefixer('last 2 versions'),
    gulp.dest(cssDest),
    rename({
      suffix: '.min',
    }),
    cleanCss(),
    gulp.dest(cssDest),
    browserSync.stream()
  ], cb);
});


// Static server
gulp.task('serve', ['styles'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(watchSrc, ['styles']);  
  gulp.watch("index.html").on('change', browserSync.reload);
});

// default gulp task
gulp.task('default', ['serve']);