const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndexResponse,
  '/good-action': apiHandler.getSingleRandomGoodActionResponse,
  '/good-actions': apiHandler.getMultipleRandomGoodActionsResponse,
  '/default-styles.css': htmlHandler.getDefaultStylesResponse,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  // Get the URL path and parameters
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  const httpMethod = request.method;

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
