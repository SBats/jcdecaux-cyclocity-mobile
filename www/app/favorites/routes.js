'use strict';

var controller = require('./controllers');

function favoritesRoute($stateProvider) {

    $stateProvider
        .state('root.favorites', {
            url: 'favorites',
            views: {
                'content' : {
                    template: require('./templates/favorites-content.html'),
                    controller: controller.FavoritesController
                }
            }
        });
}

module.exports = {
    favoritesRoute: favoritesRoute
};