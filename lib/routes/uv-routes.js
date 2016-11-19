var express = require('express');
var router = express.Router();

// TODO: Define our UV data model
// The EPA sends back the whole day's data, not the next X hours.
// We'll need to parse the date/time they send to get the current UV index

router.get('/:zipcode', function(req, res) {
  var zipcode = req.params.zipcode;

  // Sanity check, log the param
  // TODO: Validate that we did get a zip code, not 'elephant' or something
  console.log('User requested UV stats for zip: ' + zipcode);

  // Only do this once!
  // Res.send is a one time use function.
  // And, yeah, we're just sending the one.
  res.json(
    [{UV_VALUE:8}]
  );
});


module.exports = router;
