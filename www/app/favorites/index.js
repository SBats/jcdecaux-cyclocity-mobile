'use strict'

var angular = window.angular;

angular.module('cyclecity.favorites', ['ui.router'])
    .config(require('./routes').favoritesRoute)
    .service('FavoritesService', require('./services').FavoritesService);