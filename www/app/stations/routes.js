'use strict';

var controller = require('./controllers');

function StationRoute($stateProvider) {

    $stateProvider
        .state('root.station', {
            url: 'station-:stationId',
            views: {
                'content' : {
                    template: require('./templates/station-detail.html'),
                    controller: controller.StationController
                }
            },
            resolve: {
                station: function ($stateParams, StationsService) {
                    return StationsService.getStationDetail($stateParams.stationId);
                }
            }

        });
}

module.exports = {
    StationRoute: StationRoute
};