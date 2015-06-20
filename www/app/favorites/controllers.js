'use strict'

function FavoritesController($scope, $rootScope, FavoritesService, StationsService, $ionicPopover) {

    $scope.updateFavorites = function (forceRefresh) {
        FavoritesService.getFavoritesStations(forceRefresh)
            .then(
                function (favorites) {
                    $scope.favorites = favorites;
                    $rootScope.numberOfFavorites = favorites.length;
                    $scope.$broadcast('scroll.refreshComplete');
                    console.log(favorites);
                },
                function (err) {
                    console.error(err);
                }
            );
    };

    $scope.removeAFavorite = function (station) {
        FavoritesService.removeAFavorite(station);
        $scope.updateFavorites(false);
    };

    $scope.removeAllFavorites = function () {
        $scope.favorites = [];
        FavoritesService.removeAllFavorites();
        $scope.updateFavorites(false);
    };

    $scope.orderByName = function () {
        $scope.currentOrdering = 'name';
        $scope.closePopover();
    };

    $scope.orderByDistance = function () {
        $scope.currentOrdering = 'distanceFromUser';
        $scope.closePopover();
    };

    $scope.updateFavorites(true);
    $scope.currentOrdering = 'name';

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.name === 'root.favorites') {
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