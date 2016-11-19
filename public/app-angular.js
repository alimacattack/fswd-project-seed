
var angular = require('angular');

angular.module("fswd", [
  require('./fswd/registration').name,
  require('./uv/uv-service').name,
  require('./uv/uv-controller').name,
  require('angular-route/index')])


angular.bootstrap(document, ['fswd']);
