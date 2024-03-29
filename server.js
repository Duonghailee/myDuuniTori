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
    //console.log(body);
    if (error) {
      console.error(error);
    } else {
      res.send({
        next: querystring.parse(body.next).page,
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
    return {jobTitle: row.heading, company: row.company_name, datePosted: formatDate(row.date_posted), jobLink: row.slug}
    console.log(typeOf(row.date_posted));
  })
}

const formatDate = (d => {
  const backToDate = new Date(d);
  return backToDate.getDate() + '/'+ (backToDate.getMonth() + 1)  + '/' + backToDate.getFullYear() + '-' + backToDate.getHours() + ':' +backToDate.getMinutes();
});

//separte server

const server = app.listen(process.env.PORT || 3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app listens at http://%s:%s', host, port);
})


