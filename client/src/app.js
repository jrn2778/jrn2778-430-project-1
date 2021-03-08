import { customNav, goodActionCard } from './vueComponents.js';

// Initialize the Vue instance
const app = new Vue({
  el: '#app',
  components: {
    customNav,
    goodActionCard,
  },
  data: function () {
    return {
      searchResults: [],
    };
  },
  methods: {
    // Submits a query to the API to get goodActions
    search: function () {
      const form = document.querySelector('#searchForm');
      let query = '/good-actions';

      // Add limit to query
      let limit = Number(form.querySelector('#searchLimit').value);
      query += `?limit=${limit > 1 ? limit : 1}`;

      // Add tags to query if applicable
      let checked = form.querySelectorAll('input[type="checkbox"]:checked');
      checked.forEach((c) => {
        query += `&tags=${c.name}`;
      });

      // Send the query
      const xhr = new XMLHttpRequest();
      xhr.open('GET', query);
      xhr.onload = (e) => {
        // Update searchResults with the results
        if (e.target.status == 200) {
          let data = JSON.parse(e.target.response);
          this.searchResults = data;
        } else this.searchResults = [];
      };
      xhr.send();

      return false;
    },
  },
});
