
var angular = require('angular');

angular.module('uv.service', [])
  //Retrieves the UV data from the EPA
  //Requires angular's HTTP functions
  .factory('retriever',['$http', function($http) {

    //Private Service fuctions (not returned by factory)
    function realData(zip, callback) {
      $http.get('/uv/' + zip).then(
        function(response) {
          // TODO: Validation!  We might not get any data back.
          // TODO: Find the current UV value from the list. (Parse the DATE_TIME from the EPA)
          callback(response.data);
        },
        function(response) {
          // TODO: actual error logic and logging and shit
          callback('idunno')
        }
      );

      // return $http({
      //   method:'GET',
      //   url:'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/21230/JSON'
      // });
    }

    function testData(zipcode, callback)  {
      // RIVER SEZ: If you're using this for testing, update MMM/DD/YYYY to the current date.
      callback([
        {"ORDER":1,"ZIP":21230,"DATE_TIME":"NOV/15/2016 06 AM","UV_VALUE":0},
        {"ORDER":2,"ZIP":21230,"DATE_TIME":"NOV/15/2016 07 AM","UV_VALUE":0},
        {"ORDER":3,"ZIP":21230,"DATE_TIME":"NOV/15/2016 08 AM","UV_VALUE":0},
        {"ORDER":4,"ZIP":21230,"DATE_TIME":"NOV/15/2016 09 AM","UV_VALUE":1},
        {"ORDER":5,"ZIP":21230,"DATE_TIME":"NOV/15/2016 10 AM","UV_VALUE":2},
        {"ORDER":6,"ZIP":21230,"DATE_TIME":"NOV/15/2016 11 AM","UV_VALUE":2},
        {"ORDER":7,"ZIP":21230,"DATE_TIME":"NOV/15/2016 12 PM","UV_VALUE":2},
        {"ORDER":8,"ZIP":21230,"DATE_TIME":"NOV/15/2016 01 PM","UV_VALUE":2},
        {"ORDER":9,"ZIP":21230,"DATE_TIME":"NOV/15/2016 02 PM","UV_VALUE":1},
        {"ORDER":10,"ZIP":21230,"DATE_TIME":"NOV/15/2016 03 PM","UV_VALUE":1},
        {"ORDER":11,"ZIP":21230,"DATE_TIME":"NOV/15/2016 04 PM","UV_VALUE":0},
        {"ORDER":12,"ZIP":21230,"DATE_TIME":"NOV/15/2016 05 PM","UV_VALUE":0},
        {"ORDER":13,"ZIP":21230,"DATE_TIME":"NOV/15/2016 06 PM","UV_VALUE":0},
        {"ORDER":14,"ZIP":21230,"DATE_TIME":"NOV/15/2016 07 PM","UV_VALUE":0},
        {"ORDER":15,"ZIP":21230,"DATE_TIME":"NOV/15/2016 08 PM","UV_VALUE":0},
        {"ORDER":16,"ZIP":21230,"DATE_TIME":"NOV/15/2016 09 PM","UV_VALUE":0},
        {"ORDER":17,"ZIP":21230,"DATE_TIME":"NOV/15/2016 10 PM","UV_VALUE":0},
        {"ORDER":18,"ZIP":21230,"DATE_TIME":"NOV/15/2016 11 PM","UV_VALUE":0},
        {"ORDER":19,"ZIP":21230,"DATE_TIME":"NOV/15/2016 12 AM","UV_VALUE":0},
        {"ORDER":20,"ZIP":21230,"DATE_TIME":"NOV/15/2016 01 AM","UV_VALUE":0},
        {"ORDER":21,"ZIP":21230,"DATE_TIME":"NOV/15/2016 02 AM","UV_VALUE":0}
      ]);
    }

    // Get a string, send back a zip or undefined
    function parseZip(zipCode) {
      // TODO: actually parse the zip code
      return zipCode;
    }

    // Public Service functions (returned by factory)

    // This function is basically a wrapper around the realData or fakeData function
    function getByZip(zipCode, callback) {
      // Only send a valid zip to the server
      zipCode = parseZip(zipCode);

      if(zipCode = undefined) {
        // TODO: Tell the user to STFU
      }
      else {
        // ENGAGE!
        realData(zipCode, callback);
      }
    }

    // Exports from the service _to_the module
    return {
      getByZip: getByZip
    };

  }]);

// End Defiition, export module
module.exports = angular.module('uv.service');
