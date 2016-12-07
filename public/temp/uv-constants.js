var angular = require('angular');

angular.module('uv.constants', [])
  .constant("user", window.user);

module.exports = angular.module('uv.constants');
