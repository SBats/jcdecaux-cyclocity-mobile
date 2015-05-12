'use strict';

function LayoutController($scope, $rootScope, FavoritesService) {
    console.log('app loaded');

    $scope.deviceInformation = ionic.Platform.device();

    $scope.isWebView = ionic.Platform.isWebView();
    $scope.isIPad = ionic.Platform.isIPad();
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.isAndroid = ionic.Platform.isAndroid();
    $scope.isWindowsPhone = ionic.Platform.isWindowsPhone();

    $scope.currentPlatform = ionic.Platform.platform();
    $scope.currentPlatformVersion = ionic.Platform.version();

    $rootScope.numberOfFavorites = FavoritesService.countFavorites();
}

module.exports = {
    LayoutController: LayoutController
};