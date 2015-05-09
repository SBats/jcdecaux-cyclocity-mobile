var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var rename   = require('gulp-rename');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .on('error', handleErrors)
    .pipe(rename(config.outputName))
    .pipe(gulp.dest(config.dest));
});