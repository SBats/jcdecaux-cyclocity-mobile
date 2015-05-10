'use strict';

var dependencies = [
  'ionic',
  'ngResource',

  'cyclecity.init',
  'cyclecity.config',
  'cyclecity.commons',
  'cyclecity.layout',
  'cyclecity.map',
  'cyclecity.stations',
  'cyclecity.favorites'
];

window.L = require('leaflet');
require('leaflet.label');
require('leaflet.markercluster');

angular.module('cyclecity', dependencies);

require('./init');
require('./config');
require('./commons');
require('./layout');
require('./stations');
require('./map');
require('./favorites');