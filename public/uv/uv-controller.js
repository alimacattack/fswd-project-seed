
var angular = require('angular');

angular.module('uv.controller', [])
.controller('uvIndexController',['$scope', 'moment', 'retriever', 'user', function($scope, moment, retriever, user){

  $scope.zipCode = user ? user.zipCode : null;
  // $scope.skinType = null;
  // $scope.skinTypeNumber = null;
  $scope.currentUvIndex = null;
  $scope.currentAdvice = null;
  $scope.hourlyData = [];

  // var numeralsToNumbers = {
  //   'I': 1,
  //   'II': 2,
  //   'III': 3,
  //   'IV': 4,
  //   'V': 5,
  //   'VI': 6
  // };

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
    // $scope.skinTypeNumber = numeralsToNumbers[$scope.skinType];
    // if($scope.skinTypeNumber === undefined) {
    //   $scope.skinTypeNumber = 1;
    // }
    retriever.getByZip($scope.zipCode, updateUvIndex);
  }

  // Callback for the service
  function updateUvIndex(data) {
      if(data) {
        $scope.mostCurrent = findCurrentDatapoint(data);
        var index = $scope.mostCurrent.UV_VALUE;
        $scope.currentUvIndex = index;
        $scope.currentAdvice = possibleAdvice[index];
        $scope.hourlyData = data;
      }
      else {
        $scope.currentUvIndex = '...idunno';
      }
  }

  var epaFormat = "MMM/DD/YYYY h a"
  function findCurrentDatapoint(data) {
    var now = moment(Date.now());
    var mostCurrent = { difference: Infinity, data: null };
    // For every element in the array from the EPA....
    for(var i = 0; i < data.length; i++) {
      var forecastDate = moment(data[i].DATE_TIME,epaFormat);

      //... only keep the ones that are in the future.
      var difference = Math.abs(forecastDate - now);
      if(difference < mostCurrent.difference) {
        mostCurrent = {
          difference: difference,
          data:data[i]
        };
      }
    }

    return mostCurrent.data;
  }
}])

module.exports = angular.module('uv.controller');
