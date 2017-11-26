const express = require('express');
const app = express();

app.use(express.static(__dirname + '/www'));

//separte server
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app is listening at http://%s:%s', host, port);


});