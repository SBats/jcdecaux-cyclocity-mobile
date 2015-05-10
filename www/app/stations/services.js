'use strict';

function StationsService($q, $resource, appSettings) {
    var self = this;

    function refactorData(data) {
        angular.forEach(data, function (element) {
            element.name = element.name.substring(element.name.indexOf('-')+1).trim();
        });

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

    self.getDistanceToStation = function () {
        var deferred = $q.defer();

        deferred.resolve(42);

        return deferred.promise;
    };
}

module.exports = {
    StationsService: StationsService  
};