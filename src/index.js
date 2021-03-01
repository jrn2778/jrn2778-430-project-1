const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  // Pages
  '/': htmlHandler.getIndexResponse,
  '/app': htmlHandler.getAppResponse,
  '/suggest': htmlHandler.getSuggestResponse,
  '/admin': htmlHandler.getAdminResponse,
  // CSS
  '/default-styles.css': htmlHandler.getDefaultStylesResponse,
  // JS
  '/src/index.js': htmlHandler.getIndexJSReponse,
  '/src/app.js': htmlHandler.getAppJSReponse,
  '/src/suggest.js': htmlHandler.getSuggestJSReponse,
  '/src/admin.js': htmlHandler.getAdminJSReponse,
  '/src/util.js': htmlHandler.getUtilJSReponse,
  // API Endpoints
  '/good-action': apiHandler.getSingleRandomGoodActionResponse,
  '/good-actions': apiHandler.getMultipleRandomGoodActionsResponse,
  '/add': apiHandler.addSuggestionResponse,
  '/delete': apiHandler.deleteGoodActionResponse,
  '/update': apiHandler.updateGoodActionResponse,
  notFound: htmlHandler.get404Response,
};

// Handles all POST requests
const handlePOST = (request, response, pathname) => {
  const body = [];

  // https://nodejs.org/api/http.html
  request.on('error', () => {
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

  if (request.method === 'POST' || request.method === 'PUT') {
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
