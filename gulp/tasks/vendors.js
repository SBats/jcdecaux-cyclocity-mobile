var browserify = require('browserify');
var source = require('vinyl-source-stream');
var partialify = require('partialify');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var bundleLogger = require('../util/bundleLogger');
var config = require('../config').vendors;
var PACKAGE = require('../../package.json');
var exorcist = require('exorcist');
var key;

gulp.task('vendors', function () {

    var key;
    var bundler = browserify({
        // Enable source maps if true
        debug: config.debug
    });

    for (key in PACKAGE.browser) {
        bundler.require(
            PACKAGE.browser[key],
            {expose: key}
        );
    }

    // Use partialify to allow Angular templates to be require()
    bundler.transform(partialify);

    // Log when bundling starts
    bundleLogger.start(config.outputName);

    return bundler
        .bundle()
        .on('error', handleErrors)
        .pipe(exorcist(
            config.dest + '/maps/' + config.outputName + '.map',
            'maps/' + config.outputName + '.map'
        ))
        .pipe(source(config.outputName))
        .pipe(gulp.dest(config.dest))
        .on('end', function () {
            // Log when bundling completes
            bundleLogger.end(config.outputName);
        });

});
