'use strict'

var L = window.L;

function MapService(appSettings, $q, $state) {
    var self = this;
    var localisationMarkerSize = {
        android: [40, 40],
        ios: [60, 60]
    };

    self.createLocationMarker = function (position) {
        if (!self._locationMarker) {
            var currentIcon = L.divIcon({
                className: 'location',
                iconSize: ionic.Platform.isAndroid() ? localisationMarkerSize.android : localisationMarkerSize.ios,
                iconAnchor: ionic.Platform.isAndroid() ? localisationMarkerSize.android : localisationMarkerSize.ios
            });

            self._locationMarker = new L.Marker([position.coords.latitude, position.coords.longitude],{
                icon: currentIcon
            });
            console.log(self._locationMarker);
            self._map.addLayer(self._locationMarker);
        } else {
            self._locationMarker.setLatLng([position.coords.latitude, position.coords.longitude]);
        }

        
    };

    self.createClusterLayer = function () {
        return new L.markerClusterGroup({
            showCoverageOnHover: false,
            disableClusteringAtZoom: 16,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster',
                    iconSize: new L.Point(40, 40)
                });
            }
        });

    };

    self.getLocation = function () {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
                self._map.setView([position.coords.latitude, position.coords.longitude], 16);
                self.createLocationMarker(position);
            },function (err) {
                console.log(err);
            },{
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true 
            });
    };

    self.loadStations = function (stations) {
        var deferred = $q.defer(),
            i = 0;

        self._clustersLayer.clearLayers();

        angular.forEach(stations, function(aStation) {
            var available, 
                percent;
            
            if(self._currentView === 'parks'){
                percent = Math.floor((Math.round(aStation.available_bike_stands/aStation.bike_stands*100)+5)/10)*10;
            }else{
                percent = Math.floor((Math.round(aStation.available_bikes/aStation.bike_stands*100)+5)/10)*10;
            }
            
            if(self._currentView === 'parks'){
                available = String(aStation.available_bike_stands);
            }else{
                available = String(aStation.available_bikes);
            }

            var currentIcon = L.icon({
                iconUrl: 'img/markers/'+ self._currentView +'-marker-'+ percent +'.png',
                iconSize: [38, 60],
                iconAnchor: [19, 60],
                labelAnchor: [-32, -37]
            });

            var currentMarker = new L.Marker([aStation.position.lat, aStation.position.lng],{
                icon: currentIcon,
                title: available,
                alt: 'station-'+aStation.number
            }).bindLabel(
                available, 
                { 
                    noHide: true ,
                    className: 'availableNumber',
                    direction: 'left'
                }
            ).on('click', function() {
                $state.go('root.station' , {'stationId': aStation.number});
            });

            self._clustersLayer.addLayer(currentMarker);

            i++;
            if(i === stations.length) {
                self._map.addLayer(self._clustersLayer);
                var dataBounds = self._clustersLayer.getBounds();
                self._map.setMaxBounds(dataBounds.pad(0.1));
                deferred.resolve(self._currentView);
            }

        });

        return deferred.promise;
    };

    self.getCurrentView = function () {
        return self._currentView;
    };

    self.switchCurrentView = function () {
        if (self._currentView === 'cycle') {
            self._currentView = 'parks';
        } else if (self._currentView === 'parks') {
            self._currentView = 'cycle';
        }

        return self._currentView;
    };

    self.initMap = function (mapSelector) {
        // Set background Layers
        this._baseLayers = {
            main: L.tileLayer(
                appSettings.MAIN_LEAFLET_BACKGROUND.LAYER_URL,
                appSettings.MAIN_LEAFLET_BACKGROUND.OPTIONS
            )
        };

        var mapParameters = {
            center: [appSettings.LEAFLET_CONF.CENTER_LATITUDE, appSettings.LEAFLET_CONF.CENTER_LONGITUDE],
            zoom: appSettings.LEAFLET_CONF.DEFAULT_ZOOM,
            minZoom: appSettings.LEAFLET_CONF.MIN_ZOOM,
            maxZoom: appSettings.LEAFLET_CONF.MAX_ZOOM,
            scrollWheelZoom: true,
            zoomControl: false,
            layers: this._baseLayers.main
        };

        self._map = L.map(mapSelector, mapParameters);
        self._clustersLayer = self.createClusterLayer();
        self._currentView = appSettings.DEFAULT_VUE || 'cycle';
    };
}

module.exports = {
    MapService: MapService
};