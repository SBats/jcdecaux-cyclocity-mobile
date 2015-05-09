'use strict';

function InitService(StationsService) {
    var self = this;

    self.getStations = function () {
        StationsService.getStations();
    };

    self.initApp = function () {
        console.log('app init');
        self.getStations();
    };
}

module.exports = {
    InitService: InitService
};