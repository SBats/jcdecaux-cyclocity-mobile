'use strict'

function GeoUtilities($resource, $q) {
    var self = this;

    self.getRouting = function (fromPoz, toPoz) {
        var deferred = $q.defer();

        // http://www.mapquestapi.com/directions/v2/route?key=YOUR_KEY_HERE&callback=renderAdvancedNarrative&ambiguities=ignore&avoidTimedConditions=false&doReverseGeocode=true&outFormat=json&routeType=pedestrian&timeType=1&enhancedNarrative=false&shapeFormat=cmp&generalize=0&locale=fr_FR&unit=k&from=[43.580374299999995, 1.4505542]&to=[43.580795461338795, 1.449135738584587]&drivingStyle=2&highwayEfficiency=21.0

        var url = 'http://www.mapquestapi.com/directions/v2/route';

            var requests = $resource(url, {}, {
                query: {
                    method: 'GET',
                    params:{
                        key: appSettings.MAPQUESTKEY,
                        callback: 'renderAdvancedNarrative',
                        ambiguities: 'ignore',
                        avoidTimedConditions: false,
                        doReverseGeocode: true,
                        outFormat: 'json',
                        routeType: 'pedestrian',
                        timeType: 1,
                        narrativeType: 'none',
                        shapeFormat: cmp,
                        generalize: 0,
                        locale: fr_FR,
                        unit: k,
                        from: fromPoz,
                        to: toPoz
                    },
                    isArray: true
                }
            }, {stripTrailingSlashes: false});

            requests.query().$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

        return deferred.promise;
    };

}

module.exports = {
    GeoUtilities: GeoUtilities  
};