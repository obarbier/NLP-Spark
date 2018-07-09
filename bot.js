// bot.js
var env = require('node-env-file');
env(__dirname + '/.env');

var Botkit = require('botkit');
// You can find your project ID in your Dialogflow agent settings
const projectId = 'gcoebot-tutorial'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'dialagoflow';
const query = 'hello';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


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
    bot.reply(message, 'I can hear everything you say.'  + message.text )
    // The text query request.
    let request = {
      session: sessionPath,
      queryInput: {
        text: {
          text:  message.text,
          languageCode: languageCode,
        },
      },
    };
    sessionClient
      .detectIntent(request)
      .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        bot.reply(message, result.fulfillmentText);
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      })
      .catch(err => {
        console.error('ERROR:', err);
      });


});
