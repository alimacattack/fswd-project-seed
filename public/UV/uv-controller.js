
var angular = require('angular');

angular.module('uv.controller', [])
.controller('uvIndexController',['$scope','retriever', function($scope, retriever){

  // Set the current UV index to some dummy value so that we look
  // like we're doing something
  $scope.currentUvIndex = null;
  $scope.zipCode = '21230';
  var uvData;

  $scope.getUvIndex = function() {
    retriever.getByZip($scope.zipCode, updateUvIndex);
  }

  // Callback for the service
  function updateUvIndex(data) {
      uvData = data;
      if(data) {
        $scope.currentUvIndex = data[0].UV_VALUE;
      }
      else {
        $scope.currentUvIndex = '...idunno';
      }
  }
}])

module.exports = angular.module('uv.controller');
