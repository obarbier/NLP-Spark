var env = require('node-env-file');
env(__dirname + '/.env');
console.log(process.env);
