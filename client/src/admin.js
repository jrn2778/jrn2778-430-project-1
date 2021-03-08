import * as util from './util.js';
import { customNav, goodActionCard } from './vueComponents.js';

// Initialize the Vue instance
const admin = new Vue({
  el: '#admin',
  components: {
    customNav,
    goodActionCard,
  },
  data: function () {
    return {
      unapproved: [],
      approved: [],
    };
  },
  mounted: function () {
    // Populate all the good actions
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/good-actions');
    xhr.onload = (e) => {
      if (e.target.status >= 200 && e.target.status < 300) {
        const data = JSON.parse(e.target.response);

        data.forEach((goodAction) => {
          if (goodAction.tags.some((t) => t.toLowerCase() == 'unapproved')) {
            this.unapproved.push(goodAction);
          } else this.approved.push(goodAction);
        });
      }
    };
    xhr.send();
  },
  methods: {
    approveClicked: function (goodAction) {
      // Put all the goodAction's data into a string
      let formData = `id=${goodAction.id}`;
      formData += `&action=${goodAction.action}`;
      goodAction.tags.forEach((t) => {
        // Remove unapproved tag
        if (t != 'unapproved') formData += `&tags=${t}`;
      });

      util.updateGoodAction(formData, this.handleUpdate, goodAction);
    },
    removeClicked: function (goodAction) {
      util.deleteGoodAction(goodAction.id, this.handleDelete, goodAction);
    },
    handleUpdate: function (e, goodAction) {
      if (e.target.status == 204) {
         // Remove unapproved tag
        goodAction.tags.splice(0, 1);

        // Find and remove the goodAction from the unapproved section
        for (let i = 0; i < this.unapproved.length; i++) {
          if (this.unapproved[i].id == goodAction.id) {
            this.unapproved.splice(i, 1);
            break;
          }
        }

        // Add the goodAction to the approved section
        this.approved.push(goodAction);
      }
    },
    handleDelete: function (e, goodAction) {
      if (e.target.status == 204) {
        // Find whether the goodAction is unapproved or approved
        let arrayIn = this.approved;
        if (goodAction.tags[0] == 'unapproved') arrayIn = this.unapproved;

        // Remove the goodAction from the appropriate array
        for (let i = 0; i < arrayIn.length; i++) {
          if (arrayIn[i].id == goodAction.id) {
            arrayIn.splice(i, 1);
            break;
          }
        }
      }
    },
  },
});
