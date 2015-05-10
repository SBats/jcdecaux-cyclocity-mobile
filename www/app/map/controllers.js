'use strict'

function MapController($scope, MapService, StationsService) {

    $scope.loadStations = function (forceRefresh) {
        StationsService.getStations(forceRefresh)
            .then(
                function (stationsList) {
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
    };

    function init() {
        MapService.initMap('map');
        $scope.loadStations(true);
    }

    init();
}

module.exports = {
    MapController: MapController
};