var express = require('express');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('build'));

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});