import { customNav } from './vueComponents.js';

// Initialize the Vue instance
const suggest = new Vue({
  el: '#suggest',
  components: {
    customNav,
  },
  data: function () {
    return {
      responseMsg: '',
      msgColorClass: 'is-warning',
    };
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
      xhr.onload = this.handleFormResponse;
      xhr.send(formData);

      return false;
    },
    // Response after form action has completed
    handleFormResponse: function (e) {
      const xhr = e.target;

      switch (xhr.status) {
        case 200:
          this.responseMsg = 'Success!';
          this.msgColorClass = 'is-success';
          break;
        case 201:
          this.responseMsg = 'Suggestion Created!';
          this.msgColorClass = 'is-success';
          break;
        case 400:
          this.responseMsg =
            'Suggestion not submitted. Please make sure to enter an action.';
          this.msgColorClass = 'is-warning';
          break;
        default:
          this.responseMsg = 'An unknown error has occurred.';
          this.msgColorClass = 'is-danger';
          break;
      }
    },
  },
});
