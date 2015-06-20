'use strict';

function InitService(StationsService, FavoritesService) {
    var self = this;

    self.initApp = function () {
        StationsService.getStations();
        FavoritesService.getFavorites();
    };
}

module.exports = {
    InitService: InitService
};