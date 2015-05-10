'use strict';

var constants = {

    APP_ID: 'velo-toulouse',
    API_URL: 'https://api.jcdecaux.com/vls/v1/stations',
    JCDKEY: '003549deb9ac51b9d34cacc018c0e7f97039c6f9',
    CITY: 'Toulouse',
    DEFAULT_VUE: 'cycle', //can be 'cycle' or 'parks'

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
        LAYER_URL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
         OPTIONS: {
            id: 'main',
            attribution: '&copy; openstreetmap'
        }
    },

    LEAFLET_CONF: {
        DEFAULT_ZOOM: 12,
        MIN_ZOOM: 8,
        MAX_ZOOM: 17,
        CENTER_LONGITUDE: '1.4442469',
        CENTER_LATITUDE: '43.6044622'
    }

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