const fs = require('fs');

const indexPage = fs.readFileSync(`${__dirname}/../client/index.html`);
const appPage = fs.readFileSync(`${__dirname}/../client/app.html`);
const suggestPage = fs.readFileSync(`${__dirname}/../client/suggest.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/404.html`);
const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const indexJS = fs.readFileSync(`${__dirname}/../client/src/index.js`);
const appJS = fs.readFileSync(`${__dirname}/../client/src/app.js`);
const suggestJS = fs.readFileSync(`${__dirname}/../client/src/suggest.js`);
const adminJS = fs.readFileSync(`${__dirname}/../client/src/admin.js`);
const utilJS = fs.readFileSync(`${__dirname}/../client/src/util.js`);
const vueComponentsJS = fs.readFileSync(`${__dirname}/../client/src/vueComponents.js`);
const logoImg = fs.readFileSync(`${__dirname}/../client/media/logo.png`);

const getIndexResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(indexPage);
  response.end();
};

const getAppResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(appPage);
  response.end();
};

const getSuggestResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(suggestPage);
  response.end();
};

const getAdminResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
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

const getIndexJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(indexJS);
  response.end();
};

const getAppJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(appJS);
  response.end();
};

const getSuggestJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(suggestJS);
  response.end();
};

const getAdminJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(adminJS);
  response.end();
};

const getUtilJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(utilJS);
  response.end();
};

const getVueComponentsJSReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(vueComponentsJS);
  response.end();
};

const getLogoImgReponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(logoImg);
  response.end();
};

module.exports = {
  getIndexResponse,
  getAppResponse,
  getSuggestResponse,
  getAdminResponse,
  get404Response,
  getDefaultStylesResponse,
  getIndexJSReponse,
  getAppJSReponse,
  getSuggestJSReponse,
  getAdminJSReponse,
  getUtilJSReponse,
  getVueComponentsJSReponse,
  getLogoImgReponse,
};
