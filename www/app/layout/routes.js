'use strict';

var controller = require('./controllers');

function layoutRoutes($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/map');

    $stateProvider
        .state('root', {
            abstract: true,
            url: '/',
            template: require('./templates/layout.html'),
            controller: controller.LayoutController
        });
}

module.exports = {
    layoutRoutes: layoutRoutes
};