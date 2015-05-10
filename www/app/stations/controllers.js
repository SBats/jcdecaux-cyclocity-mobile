'usse strict';

function StationController(station, $scope, StationsService, FavoritesService) {
    console.log(station);
    $scope.station = station;
    $scope.isInFavorites = FavoritesService.isInFavorites;

    function getDistance() {
        $scope.distanceToStation = '...';
        StationsService.getDistanceToStation()
            .then(
                function (distance) {
                    $scope.distanceToStation = distance;
                }
            );
    }

    $scope.switchFavorite = function () {
        if (FavoritesService.isInFavorites(station)) {
            FavoritesService.removeAFavorite(station);
        } else {
            FavoritesService.addAFavorite(station);
        }
    };

    function init() {
        getDistance();
    }

}

module.exports = {
    StationController: StationController
};