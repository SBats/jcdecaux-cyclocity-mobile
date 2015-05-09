'use strict';

var angular = window.angular;

angular.module('app.layout', ['ui.router'])
    .config(require('./routes').layoutRoutes)
    .controller('LayoutController', require('./controllers').LayoutController);