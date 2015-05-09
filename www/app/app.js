'use strict';

var dependencies = [
  'ionic',
  'ngResource',

  'cyclecity.init',
  'cyclecity.layout',
  'cyclecity.map',
  'cyclecity.stations'
];

window.L = require('leaflet');
require('leaflet.markercluster');

angular.module('cyclecity', dependencies);

require('./init');
require('./layout');
require('./stations');
require('./map');