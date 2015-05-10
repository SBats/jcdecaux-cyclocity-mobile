'use strict';

var angular = window.angular;

angular.module('cyclecity.commons', [])
    .service('GeoUtilities', require('./services').GeoUtilities);