const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const covid19ImpactEstimator = require('./estimator');

const handlers = {};

handlers.getData = (data, callback) => {
  const result = covid19ImpactEstimator(JSON.parse(data.payload));
  callback(200, result);
};

handlers.getJsonData = (data, callback) => {
  callback(406, { name: 'get json data' });
};

handlers.getXmlData = (data, callback) => {
  callback(406, { name: 'get xml data' });
};

handlers.getLogs = (data, callback) => {
  callback(406, { name: 'getting logs' });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

const router = {
  '/api/v1/on-covid-19': handlers.getData,
  '/api/v1/on-covid-19/json': handlers.getJsonData,
  '/api/v1/on-covid-19/xml': handlers.getXmlData,
  '/api/v1/on-covid-19/logs': handlers.getLogs
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toLowerCase();
  const { headers } = req;
  const decorder = new StringDecoder('utf-8');

  let buffer = '';
  req.on('data', (data) => {
    buffer += decorder.write(data);
  });

  req.on('end', () => {
    buffer += decorder.end();

    const chosenHandler = typeof router[path] !== 'undefined' ? router[path] : handlers.notFound;

    const data = {
      path,
      method,
      headers,
      payload: buffer
    };

    chosenHandler(data, (statusCode, payload) => {
      res.setHeader('Content-Type', 'text/xml');
      res.writeHead(statusCode);
      res.end(JSON.stringify(payload));
    });
  });
});

server.listen(5000, () => {
  console.log('server is listeninig to port 5000');
});
