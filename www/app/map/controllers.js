'use strict'

function MapController(MapService, StationsService) {
    var self = this;

    function init() {
        MapService.initMap('map');

        StationsService.getStations()
            .then(
                function (stationsList) {
                    console.log(stationsList);
                    MapService.loadStations(stationsList)
                        .then(
                            function (currentView) {
                                self.currentView = currentView;
                            },
                            function (err) {
                                console.error(err);
                            }
                        );
                },
                function (err) {
                    console.error(err);
                }
            );
    }

    init();
}

module.exports = {
    MapController: MapController
};