'use strict';

var controller = require('./controllers');

function layoutRoutes($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            abstract: true,
            url: '',
            template: require('./templates/layout.html'),
            controller: controller.LayoutController
        })
        .state('root.home', {
            url: '/',
            views: {
                'content' : {
                    template: require('./templates/home-content.html'),
                    controller: controller.ContentController
                }
            }

        });
}

module.exports = {
    layoutRoutes: layoutRoutes
};