'use strict'

function MapController(MapService, StationsService) {

    function init() {
        MapService.initMap('map');

        StationsService.getStations()
            .then(
                function (stationsList) {
                    console.log(stationsList);
                    MapService.loadStations(stationsList)
                        .then(
                            function (currentView) {
                                $scope.currentView = currentView;
                            },
                            function (err) {
                                console.error(err);
                            }
                        );
                },
                function (err) {
                    console.error(err);
                }
            );
    }

    init();
}

module.exports = {
    MapController: MapController
};