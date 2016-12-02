
var angular = require('angular');

angular.module('uv.controller', [])
.controller('uvIndexController',['$scope','retriever', function($scope, retriever){

  $scope.zipCode = '21230';
  $scope.currentUvIndex = null;
  $scope.currentAdvice = null;

  var possibleAdvice = {
    0:'It\'s dark out',
    1:'Enjoy the outdoors',
    2:'Put on sunglasses',
    3:'Put on sunglasses and sunscreen',
    4:'Reapply SPF 30 or up at least every 2 hours',
    5:'Reapply SPF 30 or up at least every 2 hours',
    6:'Reapply SPF 30 or up at least every 2 hours',

  };

  $scope.getUvIndex = function() {
    retriever.getByZip($scope.zipCode, updateUvIndex);
  }

  // Callback for the service
  function updateUvIndex(data) {
      if(data) {
        var index = data[0].UV_VALUE;
        $scope.currentUvIndex = index
        $scope.currentAdvice = possibleAdvice[index];
      }
      else {
        $scope.currentUvIndex = '...idunno';
      }
  }
}])

module.exports = angular.module('uv.controller');
