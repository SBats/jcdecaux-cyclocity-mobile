'use strict'

function FavoritesController($scope, $rootScope, FavoritesService, StationsService, $ionicPopover) {

    $scope.updateFavorites = function (forceRefresh) {
        var favoritesListe = FavoritesService.getFavorites();
        var favorites = [];
        StationsService.getStations(forceRefresh)
            .then(
                function (stationList) {
                    angular.forEach(stationList, function (station) {
                        if (favoritesListe[station.number]) {
                            favorites.push(station);
                        }
                    });
                    $scope.favorites = favorites;
                    $scope.$broadcast('scroll.refreshComplete');
                    console.log(favorites);
                }
            );
    };

    $scope.removeAFavorite = function (station) {
        FavoritesService.removeAFavorite(station);
        $scope.updateFavorites(false); 
    };

    $scope.removeAllFavorites = function () {
        $scope.favorites = FavoritesService.removeAllFavorites();
    };

    $scope.updateFavorites(true);
    $scope.currentOrdering = 'name';

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.url === 'favorites') {
            $scope.updateFavorites(true);
        }
    });


    $scope.menuMore = $ionicPopover.fromTemplate(require('./templates/menu-more.html'), {
        scope: $scope
    });

    $scope.openPopover = function($event) {
        $scope.menuMore.show($event);
    };
    $scope.closePopover = function() {
        $scope.menuMore.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.menuMore.remove();
    });


}

module.exports = {
    FavoritesController: FavoritesController
};