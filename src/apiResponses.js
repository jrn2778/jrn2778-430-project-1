const data = require('./data.js');

// Returns the binary size of a string
// Source: https://stackoverflow.com/a/27377098
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// Converts a goodAction to XML
const goodActionAsXML = (goodAction) => {
  let xml = '<good-action>';

  // One line per key with value
  Object.keys(goodAction).forEach((key) => {
    xml += `<${key}>${goodAction[key]}</${key}>`;
  });

  xml += '</good-action>';

  return xml;
};

// Gets a single, random goodAction
const getSingleRandomGoodAction = (isXML = false) => {
  const randIndex = Math.floor(Math.random() * data.goodActions.length);

  // Check for XML or JSON version
  if (isXML) {
    return `<?xml version="1.0"?>\n${goodActionAsXML(
      data.goodActions[randIndex],
    )}`;
  }
  return JSON.stringify(data.goodActions[randIndex]);
};

// Gets one or more goodActions
const getMultipleRandomGoodActions = (enteredLimit = 1, isXML = false) => {
  // Make sure limit is within bounds (1 - goodActions length)
  let limit = Math.floor(Number(enteredLimit));
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > data.goodActions.length ? data.goodActions.length : limit;

  // Gets random goodActions of amount 'limit'
  // Source: https://stackoverflow.com/a/19270021
  const chosenGoodActions = [];
  const taken = [];
  let len = data.goodActions.length;
  let n = limit;
  while (n--) {
    const x = Math.floor(Math.random() * len);
    chosenGoodActions[n] = data.goodActions[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  // Check for XML or JSON
  if (isXML) {
    let xml = '<?xml version="1.0"?>\n<good-actions>';

    // Convert each individual goodAction into XML
    chosenGoodActions.forEach((goodAction) => {
      xml += goodActionAsXML(goodAction);
    });

    xml += '</good-actions>';

    return xml;
  }
  return JSON.stringify(chosenGoodActions);
};

// Response for getting a single good action
const getSingleRandomGoodActionResponse = (
  request,
  response,
  params,
  acceptedTypes,
  httpMethod,
) => {
  const isXML = acceptedTypes.includes('text/xml');
  const contentType = isXML ? 'text/xml' : 'application/json';
  const content = getSingleRandomGoodAction(isXML);

  const headers = { 'Content-Type': contentType };
  if (httpMethod === 'HEAD') headers['Content-Length'] = getBinarySize(content);

  response.writeHead(200, headers);
  if (httpMethod !== 'HEAD') response.write(content);
  response.end();
};

// Response for getting multiple good actions
const getMultipleRandomGoodActionsResponse = (
  request,
  response,
  params,
  acceptedTypes,
  httpMethod,
) => {
  const isXML = acceptedTypes.includes('text/xml');
  const contentType = isXML ? 'text/xml' : 'application/json';
  const content = getMultipleRandomGoodActions(params.limit, isXML);

  const headers = { 'Content-Type': contentType };
  if (httpMethod === 'HEAD') headers['Content-Length'] = getBinarySize(content);

  response.writeHead(200, headers);
  if (httpMethod !== 'HEAD') response.write(content);
  response.end();
};

module.exports = {
  getSingleRandomGoodActionResponse,
  getMultipleRandomGoodActionsResponse,
};
