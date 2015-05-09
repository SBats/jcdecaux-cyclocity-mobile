'use strict';

var angular = window.angular;

angular.module('cyclecity.config', [])
    .constant('appSettings', require('./configs').constants)
    .config(require('./configs').providersConfig);