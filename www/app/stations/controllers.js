'usse strict';

function StationController(station, $scope, $rootScope, $state, StationsService, MapService, FavoritesService) {
    console.log(station);
    $scope.station = station;
    $scope.isInFavorites = FavoritesService.isInFavorites;

    $scope.refreshData = function(stationId) {
        if (!stationId) {
            var stationId = $scope.station.number;
        }
        StationsService.getStationDetail(stationId, true)
            .then(
                function (newStation) {
                    $scope.station = newStation;
                    init();
                },
                function (err) {
                    console.error(err);
                }
            );
    };

    function getDistance() {
        $scope.distanceToStation = '...';
        StationsService.getDistanceToStation($scope.station)
            .then(
                function (distance) {
                    $scope.distanceToStation = distance;
                },
                function (err) {
                    console.error(err);
                }
            );
    }

    function getCloseStations() {
        StationsService.getCloseStations($scope.station)
            .then(
                function (closeStations) {
                    $scope.closeStations = closeStations;
                }, function (err) {
                    console.error(err);
                }
            );
    }

    $scope.switchFavorite = function () {
        if (FavoritesService.isInFavorites($scope.station)) {
            FavoritesService.removeAFavorite($scope.station);
        } else {
            FavoritesService.addAFavorite($scope.station);
        }
        $rootScope.numberOfFavorites = FavoritesService.countFavorites();
    };

    $scope.showStationOnMap = function () {
        $state.go('root.map');
        setTimeout(function () {
            MapService.showSpecificLocation($scope.station.position);
        }, 800);
    };

    function init() {
        getDistance();
        getCloseStations();
    }

    init();

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.name === 'root.station') {
            $scope.refreshData();
        }
    });

}

module.exports = {
    StationController: StationController
};