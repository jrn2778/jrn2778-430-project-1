const fs = require('fs');

const indexHTML = fs.readFileSync(`${__dirname}/../client/index.html`);
const indexJS = fs.readFileSync(`${__dirname}/../client/index.js`);
const errorPage = fs.readFileSync(`${__dirname}/../client/404.html`);
const suggestPage = fs.readFileSync(`${__dirname}/../client/suggest.html`);
const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const getIndexResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(indexHTML);
  response.end();
};

const getIndexJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(indexJS);
  response.end();
};

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getSuggestResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(suggestPage);
  response.end();
};

const getDefaultStylesResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(defaultStyles);
  response.end();
};

module.exports = {
  getIndexResponse,
  getIndexJSReponse,
  get404Response,
  getSuggestResponse,
  getDefaultStylesResponse,
};
