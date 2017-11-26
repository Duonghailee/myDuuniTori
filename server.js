const express = require('express');
const app = express();
const request = require('request');

app.use(express.static(__dirname + '/www'));

app.get('/api', function (req, res) {
  request({
    baseUrl:'https://duunitori.fi',
    uri: `api/v1/${process.env.API_DUUNI}/jobentries?format=json`,
    json: true
  }, function (error, response, body) {
    res.send(mapJobs(body.results));
  });
})

function mapJobs(jobList){
  return jobList.map(row => {
    return {
      jobTitle: row.heading,
      company: row.company_name,
      datePosted: row.date_posted
    }
  })
}


//separte server

const server = app.listen(3000, function () {
  const host = server
    .address()
    .address;
  const port = server
    .address()
    .port;
  console.log('app is listening at http://%s:%s', host, port);

});