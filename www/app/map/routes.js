'use strict';

var controller = require('./controllers');

function mapRoute($stateProvider) {

    $stateProvider
        .state('root.map', {
            url: 'map',
            views: {
                'content' : {
                    template: require('./templates/map-content.html'),
                    controller: controller.MapController,
                    controllerAs: 'map'
                }
            }

        });
}

module.exports = {
    mapRoute: mapRoute
};