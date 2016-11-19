
var angular = require('angular');

angular.module('uv.controller', [])
.controller('uvIndexController',['$scope','retriever', function($scope, retriever){
  $scope.currentUvIndex = retriever.getByZip(21201);
}])

module.exports = angular.module('uv.controller');
