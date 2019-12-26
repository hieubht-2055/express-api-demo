var express = require('express');
var app = express();
var fs = require("fs");
var birds = require('./bird')

app.use('/birds', birds)
app.get('/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse( data );
    console.log(req.params)
    var user = users["user" + req.params.id]
    console.log( user );
    res.end( JSON.stringify(user));
  });
})

app.get('/', function (req, res){
  res.sendFile( `${__dirname}/index.html` );
})

app.post('/post_users', function (req, res){
  console.log()
})

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
