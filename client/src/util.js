// Calls GET on the /good-action endpoint
// Sends the parsed JSON or null to callback
function getGoodAction(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/good-action');
  xhr.onload = (e) => {
    if (e.target.status >= 200 && e.target.status < 300) {
      callback(JSON.parse(e.target.response));
    } else callback(null);
  };
  xhr.send();
}

// Calls DELETE request to delete goodAction with given id
// htmlElement is the goodAction HTML element that also needs to be deleted (passed through to callback)
function deleteGoodAction(id, callback, htmlElement) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/delete?id=${id}`);
  xhr.onload = (e) => callback(e, htmlElement);
  xhr.send();
}

// Updates a goodAction with the given formData
// The goodAction to update is from formData.id
// htmlElement is the goodAction HTML element that also needs to be updated (passed through to callback)
function updateGoodAction(formData, callback, htmlElement) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', '/update');
  xhr.onload = (e) => callback(e, htmlElement);
  xhr.send(formData);
}

export { getGoodAction, deleteGoodAction, updateGoodAction };