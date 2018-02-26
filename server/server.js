var express = require('express');
var app = new express();
var bodyParser = require('body-parser');

// parsing the request bodys
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Welcome Carpooling App!');
});
app.get('/ride', function (req, res) {

  if (req.query.source == '' && req.query.source == '') {
    res.send('Parameters not found!');
  }

  var fs = require("fs");
  var data = fs.readFileSync("riders.json");
  var riders = JSON.parse(data);
  var query = {
    source: req.query.source,
    destination: req.query.destination
  };
  var result = filter(riders, query);

  function filter(arr, criteria) {
    return arr.filter(function (obj) {

      var currentTime = new Date();
      var startTime = new Date(obj.startTime);

      /**
       * Filtering only who is trvelling today
       */
      if (startTime.getDate() == currentTime.getDate() && startTime.getTime() > currentTime.getTime()) {

        return Object.keys(criteria).every(function (c) {

          let sourceMatch, destinationMatch = false;
          let source = obj.source.toLowerCase();
          let destination = obj.destination.toLowerCase();

          let CSource = criteria.source.toLowerCase();
          let CDestination = criteria.destination.toLowerCase();

          sourceMatch = (CSource.indexOf(source) !== -1)
          destinationMatch = (CDestination.indexOf(destination) !== -1)

          return (sourceMatch && destinationMatch)

        });
      }
    });
  }

  res.send(result);
});

// Listen to port on 5000 
app.listen(5000, function () {
  console.log('App listening on port 5000');
});
