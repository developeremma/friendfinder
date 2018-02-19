//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Configure the Express application
var app = express();
var PORT = process.env.PORT || 3000;

//access to public folder to access files
app.use(express.static(path.join(__dirname, './app/public')));

//middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

//application routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Start listening on PORT
app.listen(PORT, function() {
  console.log('Friend Finder app is listening on PORT: ' + PORT);
});