var express = require('express');
var router = express.Router();
var request = require('request');

// TODO: Define our UV data model
// The EPA sends back the whole day's data, not the next X hours.
// We'll need to parse the date/time they send to get the current UV index

router.get('/:zipcode', function(req, res) {
  var epaUrl = 'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/';
  var zipcode = req.params.zipcode;

  // Sanity check, log the param
  // TODO: Validate that we did get a zip code, not 'elephant' or something
  console.log('User requested UV stats for zip: ' + zipcode);

  request(epaUrl + zipcode + '/JSON', function(err, epaRes, body) {
    // res.send is a one time use function!

    var retVal = [];
    if(err) {
      console.log(err);
    }
    else if(epaRes.statusCode == 200) {
      // console.log('EPA SEZ: ' + JSON.stringify(epaRes));
      // TODO: Validation, you know the drill
      retVal = body;
    }
    else {
      console.log('EPA Responded with status: ' + epaRes.statusCode);
    }

    // And, yeah, we're just sending the one.
    res.json(retVal);
  });
});


module.exports = router;
