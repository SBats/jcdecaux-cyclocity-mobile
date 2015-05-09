'use strict';

var angular = window.angular;

angular.module('cyclecity.init', [])
    .run(require('./run').IonicInit);