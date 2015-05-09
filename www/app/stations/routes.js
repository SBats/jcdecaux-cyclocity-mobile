'use strict';

var controller = require('./controllers');

function StationRoute($stateProvider) {

    $stateProvider
        .state('root.station', {
            url: 'station-:stationId',
            views: {
                'content' : {
                    template: require('./templates/station-detail.html'),
                    controllerAs: 'station',
                    controller: controller.StationController
                }
            },
            resolve: {
                data: function () {
                    return {title: 'TitleTest'};
                }
            }

        });
}

module.exports = {
    StationRoute: StationRoute
};