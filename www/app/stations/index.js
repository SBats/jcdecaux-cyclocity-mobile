'use strict'

var angular = window.angular;

angular.module('cyclecity.stations', [])
    .config(require('./routes').StationRoute)
    .service('StationsService', require('./services').StationsService);