'use strict'

function MapController($scope, $rootScope, MapService, StationsService) {

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

    $scope.showLocation = function () {
        MapService.showLocation();
    };

    $scope.switchView = function () {
        $scope.currentView = MapService.switchCurrentView();
        $scope.loadStations(true);
    };

    function init() {
        $rootScope.map = MapService.initMap('map');
        $scope.loadStations(true);
        $scope.currentView = MapService.getCurrentView();
    }

    if (!$rootScope.map) {
        init();
    }

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        if (toState.name === 'root.map') {
            $scope.loadStations(true);
        }
    });

}

module.exports = {
    MapController: MapController
};