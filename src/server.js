const express = require('express');
const bodyParser = require('body-parser');

require('body-parser-xml')(bodyParser);

const covid19ImpactEstimator = require('./estimator');

const app = express();
const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.xml({ type: 'text/xml' }));

const getData = (data) => covid19ImpactEstimator(data);

app.get('/', (req, res) => {
  res.send('Express is working well');
});

app.post('/api/v1/on-covid-19', (req, res) => {
  res.json(getData(req.body));
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  res.setHeader('Content-Type', 'text/xml');
  res.json(getData(req.body));
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  res.json(getData(req.body));
});

app.post('/api/v1/on-covid-19/logs', (req, res) => {});

app.listen(port, () => {
  console.log(`Running on http://${hostname}:${port}`);
});

module.exports = app;
