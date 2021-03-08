import { customNav } from './vueComponents.js';

// Response after form action has completed
function handleFormResponse(e) {
  const xhr = e.target;

  switch (xhr.status) {
    case 200:
      alert('Success!');
      break;
    case 201:
      alert('Created!');
      break;
    case 204:
      alert('Updated (No Content)!');
      break;
    case 400:
      alert('Bad Request!');
      break;
    default:
      alert('Error code not implemented by client');
  }
}

// Initialize the Vue instance
const suggest = new Vue({
  el: '#suggest',
  components: {
    customNav,
  },
  data: function () {
    return {};
  },
  methods: {
    // Submit action for the suggestion form
    sendSuggestionForm: function (e) {
      const form = e.target;
      const formAction = form.getAttribute('action');
      const formMethod = form.getAttribute('method');

      // Get the action
      const goodActionField = form.querySelector('#goodAction');
      let formData = `action=${goodActionField.value}`;
      goodActionField.value = '';

      // Get the tags
      let checked = form.querySelectorAll('input[type="checkbox"]:checked');
      checked.forEach((c) => {
        formData += `&tags=${c.name}`;
        c.checked = false;
      });

      const xhr = new XMLHttpRequest();
      xhr.open(formMethod, formAction);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = handleFormResponse;
      xhr.send(formData);

      return false;
    },
  },
});
