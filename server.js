var server = require('./server/server');
var db = require('./server/db');
var path = require('path');

var port = process.env.PORT || 8080;
var dirPath = path.join(__dirname, 'client/build');

server(port, dirPath, db);
console.log('Server running on port ' + port);
