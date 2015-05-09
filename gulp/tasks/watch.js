var gulp = require('gulp');
var config = require('../config').sass;

gulp.task('watch', ['vendors', 'watchify', 'sass'], function() {
  gulp.watch(config.toWatch, ['sass']);
});