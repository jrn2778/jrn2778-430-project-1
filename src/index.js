const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndexResponse,
  '/suggest': htmlHandler.getSuggestResponse,
  '/index.js': htmlHandler.getIndexJSReponse,
  '/default-styles.css': htmlHandler.getDefaultStylesResponse,
  '/good-action': apiHandler.getSingleRandomGoodActionResponse,
  '/good-actions': apiHandler.getMultipleRandomGoodActionsResponse,
  '/add': apiHandler.addSuggestionResponse,
  notFound: htmlHandler.get404Response,
};

// Handles all POST requests
const handlePOST = (request, response, pathname) => {
  const body = [];

  // https://nodejs.org/api/http.html
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    urlStruct[pathname](request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  // Get the URL path and parameters
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  const httpMethod = request.method;

  if (request.method === 'POST') {
    handlePOST(request, response, pathname);
    return;
  }

  // Save the accept headers
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  // Run appropriate function based on path
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes, httpMethod);
  }
};

http.createServer(onRequest).listen(port);
