
var angular = require('angular');

angular.module("fswd", [
  require('angular-moment'),
  require('./fswd/registration').name,
  require('./uv/uv-constants').name,
  require('./uv/uv-service').name,
  require('./uv/uv-controller').name,
  require('angular-route/index')]);


angular.bootstrap(document, ['fswd']);
