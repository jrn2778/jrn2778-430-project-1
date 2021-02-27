// Initialization after window loads
window.onload = () => {
  const HEADER_INTERVAL = 10000; // How often the header's goodAction changes in ms

  // Start the interval for changing the header's goodAction
  setHeaderGoodAction(HEADER_INTERVAL);

  // Change default submit action for suggestion form
  document.querySelector('#suggestionForm').onsubmit = sendSuggestionForm;
};

// Calls GET on the /good-action endpoint
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

// Changes the home page's header goodAction on a fixed interval
function setHeaderGoodAction(interval) {
  getGoodAction((goodAction) => {
    if (goodAction != null) {
      document.querySelector('#goodAction').textContent = goodAction.action;
    }
  });

  setTimeout(() => setHeaderGoodAction(interval), interval);
}

// Response after form action has completed
function handleFormResponse(e) {
  const xhr = e.target;
  const content = document.querySelector('#status');

  switch(xhr.status){
    case 200:
      content.textContent = 'Success!';
      break;
    case 201:
      content.textContent = 'Created!';
      break;
    case 204:
      content.textContent = 'Updated (No Content)!';
      break;
    case 400:
      content.textContent = 'Bad Request!';
      break;
    default:
      content.textContent = 'Error code not implemented by client';
  }
}

// Submit action for the suggestion form
function sendSuggestionForm(e) {
  e.preventDefault();

  const form = e.target;
  const formAction = form.getAttribute('action');
  const formMethod = form.getAttribute('method');

  const goodActionField = form.querySelector('#goodAction');

  const formData = `goodAction=${goodActionField.value}`;

  const xhr = new XMLHttpRequest();
  xhr.open(formMethod, formAction);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = handleFormResponse;
  xhr.send(formData);

  return false;
}
