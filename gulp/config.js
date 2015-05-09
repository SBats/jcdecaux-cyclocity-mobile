'use strict';
var src = 'www',
    dest = 'www',
    appFolder = 'app',
    appName = 'app';


module.exports = {
    sass: {
        src: src + '/' + appFolder + '/' + appName + '.scss',
        dest: dest,
        toWatch: src + '/' + appFolder + '/**/*.scss',
        settings: {
            sourceComments: 'map',
            outFile: './' + src,
            sourceMap: true,
            sourceMapContents: true,
            sourceMapEmbed: true,
            outputStyle: 'compact',
            imagePath: '/img' // Used by the image-url helper
        }
    },
    browserify: {
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [
            {
                entries: src + '/' + appFolder + '/' + appName + '.js',
                dest: dest,
                outputName: appName + '.js'
            }
        ]
    }
};