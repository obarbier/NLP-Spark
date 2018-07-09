// server.js

var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('botkit:incoming_webhooks');

 module.exports = function(controller) {

    var webserver = express();
    // Parse request bodies
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));
    // Setup a static directory 'public', totally optional
    webserver.use(express.static('public'));

    // You can pass in whatever hostname you want as the second argument
    // of the express listen function, it defaults to 0.0.0.0 aka localhost
    processs_env_hostName=process.env.HOSTNAME || 'http://localhost'
    processs_env_port = process.env.PORT || 30;

    webserver.listen(processs_env_port,  null, function() {
        console.log('Express webserver configured and listening at ',
            processs_env_hostName + ':' + processs_env_port);
    });

    // Register our Facebook webhook routes
    // Pass in the express server, and the botkit controller into
    // the routes file to extend both of them

    require('./incoming-webhook')(webserver, controller)

     controller.webserver = webserver;

    return webserver;

 }
