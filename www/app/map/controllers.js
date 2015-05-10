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

    $scope.getLocation = function () {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
            },function (err) {
                console.log(err);
            },{
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true 
            });
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