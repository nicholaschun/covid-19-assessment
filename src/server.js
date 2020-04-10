const http = require('http');
const url = require('url');
const xml = require('xml');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const covid19ImpactEstimator = require('./estimator');

const port = process.env.PORT || 5000;

const handlers = {};

handlers.getData = (data, callback) => {
  const result = covid19ImpactEstimator(JSON.parse(data.payload));
  callback(200, result);
};

handlers.getLogs = (data, callback) => {
//     const 
//   callback(200, );
};

handlers.getHome = (data, callback) => {
  callback(200, 'Covid-19 Estimator Api');
};

const router = {
  '/': handlers.getHome,
  '/api/v1/on-covid-19': handlers.getData,
  '/api/v1/on-covid-19/json': handlers.getData,
  '/api/v1/on-covid-19/xml': handlers.getData,
  '/api/v1/on-covid-19/logs': handlers.getLogs
};

const logData = (data) => {
  const text = `${data.method} \t \t ${data.path} \n`;
  const file = fs.createWriteStream('logs.log');
  file.write(text);
  file.end();
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const { method } = req;
  const { headers } = req;
  const decorder = new StringDecoder('utf-8');

  let buffer = '';
  req.on('data', (data) => {
    buffer += decorder.write(data);
  });

  req.on('end', () => {
    buffer += decorder.end();

    const chosenHandler =
      typeof router[path] !== 'undefined' ? router[path] : handlers.notFound;

    const data = {
      path,
      method,
      headers,
      payload: buffer
    };

    chosenHandler(data, (statusCode, payload) => {
      if (path === '/api/v1/on-covid-19/xml') {
        res.setHeader('Content-Type', 'text/xml');
        res.writeHead(statusCode);
        res.end(xml(payload));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(JSON.stringify(payload));
      }
    });
    logData(data);
  });
});

server.listen(port, () => {
  console.log('server is listeninig to port 5000');
});
