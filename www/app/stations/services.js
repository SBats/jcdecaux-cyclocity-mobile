'use strict';

function StationsService($q, $resource, appSettings) {
    var self = this;

    self.getStations = function (forceRefresh) {
        var deferred = $q.defer();

        if (self._stations && !forceRefresh) {
            deferred.resolve(self._stations);
        } else {
            var url = appSettings.API_URL;

            var requests = $resource(url, {}, {
                query: {
                    method: 'GET',
                    cache: true,
                    params:{
                        contract: appSettings.CITY,
                        apiKey: appSettings.JCDKEY
                    },
                    isArray: true
                }
            }, {stripTrailingSlashes: false});

            requests.query().$promise
                .then(function (data) {
                    self._stations = data;
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
                    cache: true,
                    params:{
                        contract: appSettings.CITY,
                        apiKey: appSettings.JCDKEY
                    },
                    isArray: false
                }
            }, {stripTrailingSlashes: false});

            requests.query().$promise
                .then(function (data) {
                    self[stationRef] = data;
                    deferred.resolve(self[stationRef]);
                });
        }

        return deferred.promise;
    };
}

module.exports = {
    StationsService: StationsService  
};