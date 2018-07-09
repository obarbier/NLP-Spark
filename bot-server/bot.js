// bot.js
var env = require('node-env-file');
env(__dirname + '/.env');

var Botkit = require('botkit');
var apiaibotkit = require('api-ai-botkit');
const apiai = apiaibotkit(process.env.apiaiToken);
// Create the Botkit controller, which controls all instances of the bot.
console.log("<======================");
console.log("creating Controller");
console.log("======================>");

var controller = Botkit.sparkbot({
    // debug: true,
    // limit_to_domain: ['mycompany.com'],
    // limit_to_org: 'my_cisco_org_id',
    public_address: process.env.public_address,
    ciscospark_access_token: process.env.access_token,
    studio_token: process.env.studio_token, // get one from studio.botkit.ai to enable content management, stats, message console and more
    secret: process.env.secret, // this is an RECOMMENDED but optional setting that enables validation of incoming webhooks
    webhook_name: 'Cisco Spark bot created with Botkit, override me before going to production',
    studio_command_uri: process.env.studio_command_uri,
});

console.log("<======================");
console.log("Express Powered web server");
console.log("======================>");

 var webserver = require('./server.js')(controller);
// Wildcard hears response, will respond to all user input with 'Hello World!'

controller.hears('.*', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.reply(message, 'I can hear everything you say.')
    apiai.process(message, bot)
});
apiai
    .action('welcome.intent', function (message, resp, bot) {
        var responseText = resp.result.fulfillment.speech;
        console.log('welcome.intent')
        bot.reply(message, responseText);
    })
    .action('input.unknown', function (message, resp, bot) {
        bot.reply(message, "Sorry, I don't understand");
    });
