var express = require('express');
var app = express();

app.use(express.static('./app/dist'));

var server = app.listen(4443, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at localhost:', port);
});
