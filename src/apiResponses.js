const { v4: uuidv4 } = require('uuid');
const data = require('./data.js');

// Returns the binary size of a string
// Source: https://stackoverflow.com/a/27377098
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// Get tags back as an array
const convertTagsToArr = (tags) => {
  if (tags == null) return [];

  const tagsArr = Array.isArray(tags) ? tags : [tags];
  return tagsArr.map((t) => t.toLowerCase());
};

// Returns the goodActions containing the given tags
const getDataSetWithTags = (tags) => {
  // Full data set if not tags are provided
  if (tags.length <= 0) return data.goodActions;

  // Make sure tags is an array and all lower case
  const tagsArr = convertTagsToArr(tags);

  const newData = [];

  if (tagsArr.length > 0) {
    // Add goodAction to newData if it has one of the tags
    data.goodActions.forEach((goodAction) => {
      if (goodAction.tags.some((tag) => tagsArr.includes(tag.toLowerCase()))) {
        newData.push(goodAction);
      }
    });
  }

  return newData;
};

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
const getSingleRandomGoodAction = (isXML = false, tags = []) => {
  // Only use goodActions that have the given tags
  const applicableData = getDataSetWithTags(tags);

  // Return null if there is no data
  if (applicableData.length <= 0) return null;

  const randIndex = Math.floor(Math.random() * applicableData.length);

  // Check for XML or JSON version
  if (isXML) {
    return `<?xml version="1.0"?>\n${goodActionAsXML(
      applicableData[randIndex],
    )}`;
  }
  return JSON.stringify(applicableData[randIndex]);
};

// Gets one or more goodActions
const getMultipleRandomGoodActions = (
  isXML = false,
  enteredLimit = null,
  tags = [],
) => {
  // Only use goodActions that have the given tags
  const applicableData = getDataSetWithTags(tags);
  const chosenGoodActions = [];

  // Return null if there is no data
  if (applicableData.length <= 0) return null;

  // Don't shuffle if no limit was entered
  if (enteredLimit != null) {
    // Make sure limit is within bounds (1 - goodActions length)
    let limit = Math.floor(Number(enteredLimit));
    limit = !limit ? 1 : limit;
    limit = limit < 1 ? 1 : limit;
    limit = limit > applicableData.length ? applicableData.length : limit;

    // Gets random goodActions of amount 'limit'
    // Source: https://stackoverflow.com/a/19270021
    const taken = [];
    let len = applicableData.length;
    let n = limit;
    while (n--) {
      const x = Math.floor(Math.random() * len);
      chosenGoodActions[n] = applicableData[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
  } else {
    applicableData.forEach((goodAction) => {
      chosenGoodActions.push(goodAction);
    });
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
  const content = getSingleRandomGoodAction(isXML, params.tags);
  const status = content == null ? 204 : 200;

  const headers = { 'Content-Type': contentType };
  if (httpMethod === 'HEAD') headers['Content-Length'] = getBinarySize(content);

  response.writeHead(status, headers);
  if (httpMethod !== 'HEAD' && status !== 204) response.write(content);
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
  const content = getMultipleRandomGoodActions(
    isXML,
    params.limit,
    params.tags,
  );
  const status = content == null ? 204 : 200;

  const headers = { 'Content-Type': contentType };
  if (httpMethod === 'HEAD') headers['Content-Length'] = getBinarySize(content);

  response.writeHead(status, headers);
  if (httpMethod !== 'HEAD' && status !== 204) response.write(content);
  response.end();
};

// Adds a suggested response to the data
const addSuggestionResponse = (request, response, params) => {
  let status = 400;
  const responseJSON = {
    message: "A 'Good Action' is required",
  };

  if (params.action != null && params.action.trim() !== '') {
    const newData = {
      id: uuidv4(),
      action: params.action,
      tags: ['unapproved', ...convertTagsToArr(params.tags)],
    };
    data.goodActions.push(newData);

    status = 201;
    responseJSON.message = 'Successfully added!';
  }

  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(responseJSON));
  response.end();
};

// Removes the goodAction with the given params.id
const deleteGoodActionResponse = (request, response, params) => {
  for (let i = 0; i < data.goodActions.length; i++) {
    if (data.goodActions[i].id === params.id) {
      data.goodActions.splice(i, 1);
      break;
    }
  }

  response.writeHead(204, {});
  response.end();
};

// Updates the goodAction with the given params.id
const updateGoodActionResponse = (request, response, params) => {
  for (let i = 0; i < data.goodActions.length; i++) {
    if (data.goodActions[i].id === params.id) {
      data.goodActions[i].action = params.action;
      data.goodActions[i].tags = convertTagsToArr(params.tags);
      break;
    }
  }

  response.writeHead(204, {});
  response.end();
};

module.exports = {
  getSingleRandomGoodActionResponse,
  getMultipleRandomGoodActionsResponse,
  addSuggestionResponse,
  deleteGoodActionResponse,
  updateGoodActionResponse,
};
