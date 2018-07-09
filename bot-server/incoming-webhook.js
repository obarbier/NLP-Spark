// incoming-webhook.js
var debug = require('debug')('botkit:incoming_webhooks');

module.exports = function(webserver, controller) {
    // Receive post data from fb, this will be the messages you receive
    debug('Configured POST /ciscospark/receive url for receiving events');

     webserver.post('/ciscospark/receive', function(req, res) {
        // respond to FB that the webhook has been received.
         res.status(200);
         res.send('Post ==> Ok');
        var bot = controller.spawn({});

        // Now, pass the webhook into be processed
         controller.handleWebhookPayload(req, res, bot);
     });
    // Perform the FB webhook verification handshake with your verify token
    webserver.get('/ciscospark/receive', function(req, res) {

        res.send('get ==> OK')
    });
}
