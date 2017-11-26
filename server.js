"user strict";

const express = require('express');
const app = express();
const request = require('request');
const querystring = require('querystring');

app.use(express.static(__dirname + '/src'));

app.get('/api', function (req, res) {
  const {area, search, next} = req.query;
  console.log(req.query);
  request({
    baseUrl: 'https://duunitori.fi',
    uri: `api/v1/${process.env.API_DUUNI}/jobentries`,
    json: true,
    qs: {
      area,
      search,
      page: next,
      format: "json"
    }
  }, function (error, response, body) {
    if (error) {
      console.error(error);
    } else {
      res.send({
        next: querystring
          .parse(body.next)
          .page,
        jobs: mapJobs(body.results)
      });
    }
  });
})

function mapJobs(jobList) {
  if (!Array.isArray(jobList)) {
    return [];
  }
  return jobList.map(row => {
    return {jobTitle: row.heading, company: row.company_name, datePosted: row.date_posted}
  })
}

//separte server

const server = app.listen(process.env.PORT || 3000, function () {
  const host = server
    .address()
    .address;
  const port = server
    .address()
    .port;
  console.log('app is listening at http://%s:%s', host, port);
});