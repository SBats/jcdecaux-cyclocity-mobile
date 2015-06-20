'usse strict';

function StationController(station, $scope, $rootScope, StationsService, FavoritesService) {
    console.log(station);
    $scope.station = station;
    $scope.isInFavorites = FavoritesService.isInFavorites;

    $scope.refreshData = function() {
        StationsService.getStationDetail($scope.station.number, true)
            .then(
                function (newStation) {
                    $scope.station = newStation;
                },
                function (err) {
                    console.error(err);
                }
            );
    };

    function getDistance() {
        $scope.distanceToStation = '...';
        StationsService.getDistanceToStation(station)
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
        StationsService.getCloseStations(station)
            .then(
                function (closeStations) {
                    $scope.closeStations = closeStations;
                }, function (err) {
                    console.error(err);
                }
            );
    }

    $scope.switchFavorite = function () {
        if (FavoritesService.isInFavorites(station)) {
            FavoritesService.removeAFavorite(station);
        } else {
            FavoritesService.addAFavorite(station);
        }
        $rootScope.numberOfFavorites = FavoritesService.countFavorites();
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