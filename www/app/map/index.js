'use strict';

var angular = window.angular;

angular.module('cyclecity.map', ['ui.router'])
    .config(require('./routes').mapRoute)
    .service('MapService', require('./services').MapService);