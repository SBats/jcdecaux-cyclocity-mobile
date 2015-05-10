'use strict'

function FavoritesService(appSettings) {
    var self = this,
        storageName = appSettings.APP_ID + '-favorites';

    self.isInFavorites = function (station) {
        if (station && self._favorites[station.number]) {
            return true;
        }

        return false;
    };

    self.getFavorites = function () {
        if (self._favorites) {
            return self._favorites;
        }

        if (!localStorage.getItem(storageName)) {
            self._favorites = {};
            self.setFavorites();
        } else {
            var favorites_json = localStorage.getItem(storageName);
            self._favorites = JSON.parse(favorites_json);
        }
        console.log(self._favorites);

        return self._favorites;
    };

    self.setFavorites = function () {
        var favorites_json = JSON.stringify(self._favorites);
        localStorage.setItem(storageName, favorites_json);
    };

    self.removeAllFavorites = function () {
        self._favorites = {};
        localStorage.removeItem(storageName);
    };

    self.addAFavorite = function (station) {
        if (station && !self.isInFavorites(station)) {
            self._favorites[station.number] = {
                number: station.number
            };
            self.setFavorites();
        }
    };

    self.removeAFavorite = function (station) {
        if (station && self.isInFavorites(station)) {
            delete self._favorites[station.number];
            self.setFavorites();
        }
    };
}

module.exports = {
    FavoritesService: FavoritesService
};