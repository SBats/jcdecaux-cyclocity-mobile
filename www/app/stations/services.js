'use strict';

function StationsService($q, $resource, appSettings, MapService) {
    var self = this;

    function refactorData(data) {
        if (data.name) {
            data.name = data.name.substring(data.name.indexOf('-')+1).trim().toLowerCase().capitalizeFirstLetter();
            data.address = data.address.trim().toLowerCase().capitalizeFirstLetter();
        } else {
            angular.forEach(data, function (element) {
                element.name = element.name.substring(element.name.indexOf('-')+1).trim().toLowerCase().capitalizeFirstLetter();
                element.address = element.address.trim().toLowerCase().capitalizeFirstLetter();
            });
        }

        return data;
    }

    self.getStations = function (forceRefresh) {
        var deferred = $q.defer();

        if (self._stations && !forceRefresh) {
            deferred.resolve(self._stations);
        } else {
            var url = appSettings.API_URL;

            var requests = $resource(url, {}, {
                query: {
                    method: 'GET',
                    params:{
                        contract: appSettings.CITY,
                        apiKey: appSettings.JCDKEY
                    },
                    isArray: true
                }
            }, {stripTrailingSlashes: false});

            requests.query().$promise
                .then(function (data) {
                    self._stations = refactorData(data);
                    deferred.resolve(self._stations);
                });
        }

        return deferred.promise;
    };

    self.getStationDetail = function (stationId, forceRefresh) {
        var deferred = $q.defer();
        var stationRef = '_station-' + stationId; 

        if (self[stationRef] && !forceRefresh) {
            deferred.resolve(self[stationRef]);
        } else {
            var url = appSettings.API_URL + '/' + stationId;

            var requests = $resource(url, {}, {
                query: {
                    method: 'GET',
                    params:{
                        contract: appSettings.CITY,
                        apiKey: appSettings.JCDKEY
                    },
                    isArray: false
                }
            }, {stripTrailingSlashes: false});

            requests.query().$promise
                .then(function (data) {
                    self[stationRef] = refactorData(data);
                    deferred.resolve(self[stationRef]);
                });
        }

        return deferred.promise;
    };

    self.getDistanceToStation = function (station) {
        var deferred = $q.defer();
        MapService.getLocation()
            .then(
                function (location) {
                    var userLocation = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    };

                    var distance = MapService.getDistanceBetweenTwoPoints(userLocation, station.position);

                    if (distance > 500) {
                        distance = Math.round(distance/10)/100 + ' km';
                    } else {
                        distance = distance + ' m';
                    }
                    deferred.resolve(distance);
                },
                function (err) {
                    console.error(err);
                }
            );

        return deferred.promise;
    };

    self.getCloseStations = function (station) {
        var deferred = $q.defer(),
            closeStations = [];

        self.getStations()
            .then(
                function (stations) {
                    var comparedStation = {},
                        distance = 0;
                    for (var i = stations.length - 1; i >= 0; i--) {
                        comparedStation = stations[i];
                        distance = MapService.getDistanceBetweenTwoPoints(station.position, comparedStation.position);
                        if (distance <= appSettings.CLOSE_STATIONS_MAX_DISTANCE && station.number !== comparedStation.number) {
                            comparedStation.distanceToStation = distance;
                            closeStations.push(comparedStation);
                        }
                    }
                    deferred.resolve(closeStations);
                },
                function (err) {
                    console.error(err);
                }
            );

        return deferred.promise;
    };

}

module.exports = {
    StationsService: StationsService  
};