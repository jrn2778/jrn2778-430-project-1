const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/404.html`);
const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const getIndexResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getDefaultStylesResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(defaultStyles);
  response.end();
};

module.exports = {
  getIndexResponse,
  get404Response,
  getDefaultStylesResponse,
};
