
var angular = require('angular');

angular.module('uv.controller', [])
.controller('uvIndexController',['$scope','retriever', function($scope, retriever){

  // Set the current UV index to some dummy value so that we look
  // like we're doing something
  $scope.currentUvIndex = '... drum roll please';
  var uvData;


  retriever.getByZip(21230, updateUvIndex);

  // Callback for the service
  function updateUvIndex(data) {
      uvData = data;
      $scope.currentUvIndex = data[0].UV_VALUE;
  }
}])

module.exports = angular.module('uv.controller');
