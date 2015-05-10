'use strict';

function InitService(StationsService, FavoritesService) {
    var self = this;

    self.initApp = function () {
        console.log('app init');
        StationsService.getStations();
        FavoritesService.getFavorites();
    };
}

module.exports = {
    InitService: InitService
};