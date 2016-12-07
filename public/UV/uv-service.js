
var angular = require('angular');

angular.module('uv.service', [])
  //Retrieves the UV data from the EPA
  //Requires angular's HTTP functions
  .factory('retriever',['$http', 'moment', function($http, moment) {
    //The format used the EPA
      var epaFormat = "MMM/DD/YYYY h a"
      // function trimEpaArray(data) {
      //   var now = moment(Date.now());
      //   var retVal = [];
      //   // For every element in the array from the EPA....
      //   for(var i = 0; i < data.length; i++) {
      //     var forecastDate = moment(data[i].DATE_TIME,epaFormat);
      //
      //     //... only keep the ones that are in the future.
      //     if(now <= forecastDate) {
      //       retVal.push(data[i]);
      //     }
      //   }
      //
      //   return retVal;
      // }

      function parseHour(data) {
        for(var i = 0; i < data.length; i++) {
          var forecastMoment = moment(data[i].DATE_TIME, epaFormat);
          data[i].TIME = forecastMoment.format('h a');
        }

        return data;
      }




    //Private Service fuctions (not returned by factory)
    function realData(zip, callback) {
      $http.get('/uv/' + zip).then(
        function(response) {
          // TODO: Validation!  We might not get any data back.
          // RIVER SEZ - HTTP get sends back a string that will need to be parsed
          uvarray = JSON.parse(response.data);
          uvarray = parseHour(uvarray);

          if(uvarray.length == 0) {
            uvarray = undefined;
          }
          callback(uvarray);
        },
        function(response) {
          // TODO: actual error logic and logging and shit
          callback(undefined)
        }
      );

      return $http({
        method:'GET',
        url:'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/21230/JSON'
      });
    }

    function testData(zipcode, callback)  {
      // RIVER SEZ: If you're using this for testing, update MMM/DD/YYYY to the current date.
      callback(parseHour([
        {"ORDER":1,"ZIP":21230,"DATE_TIME":"DEC/4/2016 06 AM","UV_VALUE":0},
        {"ORDER":2,"ZIP":21230,"DATE_TIME":"DEC/4/2016 07 AM","UV_VALUE":0},
        {"ORDER":3,"ZIP":21230,"DATE_TIME":"DEC/4/2016 08 AM","UV_VALUE":0},
        {"ORDER":4,"ZIP":21230,"DATE_TIME":"DEC/4/2016 09 AM","UV_VALUE":1},
        {"ORDER":5,"ZIP":21230,"DATE_TIME":"DEC/4/2016 10 AM","UV_VALUE":2},
        {"ORDER":6,"ZIP":21230,"DATE_TIME":"DEC/4/2016 11 AM","UV_VALUE":3},
        {"ORDER":7,"ZIP":21230,"DATE_TIME":"DEC/4/2016 12 PM","UV_VALUE":4},
        {"ORDER":8,"ZIP":21230,"DATE_TIME":"DEC/4/2016 01 PM","UV_VALUE":6},
        {"ORDER":9,"ZIP":21230,"DATE_TIME":"DEC/4/2016 02 PM","UV_VALUE":7},
        {"ORDER":10,"ZIP":21230,"DATE_TIME":"DEC/4/2016 03 PM","UV_VALUE":9},
        {"ORDER":11,"ZIP":21230,"DATE_TIME":"DEC/4/2016 04 PM","UV_VALUE":10},
        {"ORDER":12,"ZIP":21230,"DATE_TIME":"DEC/4/2016 05 PM","UV_VALUE":11},
        {"ORDER":13,"ZIP":21230,"DATE_TIME":"DEC/4/2016 06 PM","UV_VALUE":10},
        {"ORDER":14,"ZIP":21230,"DATE_TIME":"DEC/4/2016 07 PM","UV_VALUE":8},
        {"ORDER":15,"ZIP":21230,"DATE_TIME":"DEC/4/2016 08 PM","UV_VALUE":7},
        {"ORDER":16,"ZIP":21230,"DATE_TIME":"DEC/4/2016 09 PM","UV_VALUE":5},
        {"ORDER":17,"ZIP":21230,"DATE_TIME":"DEC/4/2016 10 PM","UV_VALUE":4},
        {"ORDER":18,"ZIP":21230,"DATE_TIME":"DEC/4/2016 11 PM","UV_VALUE":3},
        {"ORDER":19,"ZIP":21230,"DATE_TIME":"DEC/4/2016 12 AM","UV_VALUE":1},
        {"ORDER":20,"ZIP":21230,"DATE_TIME":"DEC/4/2016 01 AM","UV_VALUE":0},
        {"ORDER":21,"ZIP":21230,"DATE_TIME":"DEC/4/2016 02 AM","UV_VALUE":0}
      ]));
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

      if(undefined == zipCode) {
        // TODO: Tell the user to STFU
      }
      else {
        // ENGAGE!
        realData(zipCode, callback);
        // testData(zipCode, callback);
      }
    }

    // Exports from the service _to_the module
    return {
      getByZip: getByZip
    };

  }]);

// End Defiition, export module
module.exports = angular.module('uv.service');
