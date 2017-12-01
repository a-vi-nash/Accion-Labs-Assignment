
var express = require('express')
var bodyParser = require("body-parser");

var employees = require('./employees/router.js');


var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//list of api modules with routes linking
app.use('/api/employees', employees);



// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    res.status(404).send({"Message": "Route not found"});
});

//Error handling
app.use(function (err, req, res, next) {
    // logic
    res.status(500).send(err);
});

module.exports = app
