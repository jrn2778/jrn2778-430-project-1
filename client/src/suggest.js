// Initialization after window loads
window.onload = () => {
  // Change default submit action for suggestion form
  document.querySelector('#suggestionForm').onsubmit = sendSuggestionForm;
};

// Response after form action has completed
function handleFormResponse(e) {
  const xhr = e.target;
  const content = document.querySelector('#status');

  switch (xhr.status) {
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

  let formData = `action=${goodActionField.value}`;
  let checked = form.querySelectorAll('input[type="checkbox"]:checked');
  checked.forEach((c) => {
    formData += `&tags=${c.name}`;
  });

  const xhr = new XMLHttpRequest();
  xhr.open(formMethod, formAction);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = handleFormResponse;
  xhr.send(formData);

  return false;
}
