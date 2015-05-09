'use strict';

var dependencies = [
  'ionic',

  'cyclecity.init',
  'cyclecity.layout',
  'cyclecity.map',
  'cyclecity.stations'
];

angular.module('cyclecity', dependencies);

require('./init');
require('./layout');
require('./stations');
require('./map');