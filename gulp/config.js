'use strict';
var src = 'www',
    dest = 'www',
    appFolder = 'app',
    appName = 'cyclecity';


module.exports = {
    sass: {
        src: src + '/' + appFolder + '/app.scss',
        dest: dest,
        outputName: appName + '.css',
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
    vendors: {
        debug: true,
        outputName : appName + '-vendors.js',
        dest: dest
    },
    browserify: {
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [
            {
                entries: src + '/' + appFolder + '/app.js',
                dest: dest,
                outputName: appName + '.js'
            }
        ]
    }
};