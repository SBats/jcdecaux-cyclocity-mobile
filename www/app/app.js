'use strict';

var dependencies = [
  'ionic',
  'ngResource',

  'cyclecity.init',
  'cyclecity.config',
  'cyclecity.layout',
  'cyclecity.map',
  'cyclecity.stations'
];

window.L = require('leaflet');
require('leaflet.label');
require('leaflet.markercluster');

angular.module('cyclecity', dependencies);

require('./init');
require('./config');
require('./layout');
require('./stations');
require('./map');