'use strict'

function FavoritesService($q, appSettings, StationsService, MapService) {
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

        return self._favorites;
    };

    self.countFavorites = function () {
        if (!self._favorites) {
            self.getFavorites();
        }

        return Object.keys(self._favorites).length;
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

    self.getFavoritesStations = function (forceRefresh) {
        var deferred = $q.defer(),
            favoritesListe = self.getFavorites(),
            favorites = [],
            stationsList = [],
            userLocation = {},
            promises = [];

        promises.push(StationsService.getStations(forceRefresh)
            .then(
                function (stations) {
                    stationsList = stations;
                }
            )
        );

        promises.push(MapService.getLocation()
            .then(
                function (location) {
                    userLocation = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    };
                }
            )
        );

        $q.all(promises)
            .then(
                function () {
                    angular.forEach(stationsList, function (station) {
                        if (favoritesListe[station.number]) {
                            var distance = MapService.getDistanceBetweenTwoPoints(userLocation, station.position);
                            station.distance = distance;

                            if (distance > 500) {
                                station.distanceFromUser = Math.round(distance/10)/100 + ' km';
                            } else {
                                station.distanceFromUser = distance + ' m';
                            }
                            favorites.push(station);
                        }
                    });

                    deferred.resolve(favorites);
                },
                function (err) {
                    console.error(err);
                }
            );

        return deferred.promise;
    };
}

module.exports = {
    FavoritesService: FavoritesService
};