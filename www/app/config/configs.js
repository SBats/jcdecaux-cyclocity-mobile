'use strict';

var constants = {

    APP_ID: 'velo-toulouse',
    API_URL: 'https://api.jcdecaux.com/vls/v1/stations',
    JCDKEY: 'YOUR_JCDECEAUX_API_KEY',
    MAPQUESTKEY: '',
    CITY: 'Toulouse',
    DEFAULT_VUE: 'cycle', // can be 'cycle' or 'parks',
    CLOSE_STATIONS_MAX_DISTANCE: 500,// in meters

    // LANGUAGES PARAMETERS //
    //
    //

    DEFAULT_LANGUAGE: 'fr',
    AVAILABLE_LANGUAGES: [
        {code: 'fr', label: 'Français'},
        {code: 'en', label: 'English'}
    ],


    // MAP PARAMETERS //
    //
    //
    MAIN_LEAFLET_BACKGROUND: {
        LAYER_URL: 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png',
         OPTIONS: {
            id: 'main',
            subdomains: '1234',
            type: 'osm',
            attribution: 'MapQuest'
        }
    },

    LEAFLET_CONF: {
        DEFAULT_ZOOM: 14,
        MIN_ZOOM: 12,
        MAX_ZOOM: 17,
        CENTER_LONGITUDE: '1.4442469',
        CENTER_LATITUDE: '43.6044622'
    },

    DISABLE_CLUSTERING_AT_ZOOM: 16

};

function providersConfig($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self'
    ]);

    // resrources blacklisted for our app
    $sceDelegateProvider.resourceUrlBlacklist([

    ]);
}

module.exports = {
    constants: constants,
    providersConfig: providersConfig
};