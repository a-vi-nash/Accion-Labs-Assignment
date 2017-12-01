
var app = require('./Index.js');
var config = require('./config.js');



app.listen(config.express.port, function (error) {
    if (error) {
        console.log('Unable to listen for connections', error);
        process.exit(10);
    }
    console.log('Server listening at port ' + config.express.port);
});
