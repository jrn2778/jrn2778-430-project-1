import * as util from './util.js';
import { customNav } from './vueComponents.js';

// Changes the home page's header goodAction on a fixed interval
function setHeaderGoodAction(interval) {
  util.getGoodAction((goodAction) => {
    if (goodAction != null) {
      // Animate the received message
      home.animateHeader(goodAction.action, () => {
        setTimeout(() => setHeaderGoodAction(interval), interval);
      });
    }
  });
}

// Initialize the Vue instance
const home = new Vue({
  el: '#home',
  components: {
    customNav,
  },
  data: function () {
    return {
      headerMsg: 'YOU can make the world a better place',
    };
  },
  mounted: function () {
    const HEADER_INTERVAL = 5000; // How often the header's goodAction changes in ms

    // Type out the initial header than continuously change it on an interval
    this.typeHeader(this.headerMsg, () => {
      // Start the interval for changing the header's goodAction
      setTimeout(() => setHeaderGoodAction(HEADER_INTERVAL), HEADER_INTERVAL);
    });
  },
  methods: {
    // Calls the necessary functions to animate the header text
    // nextAction: The next header message
    // callback: Function called after finished animating
    animateHeader: function (nextAction, callback) {
      this.deleteHeader(() => {
        this.typeHeader(nextAction, callback);
      });
    },
    // Typing effect animation
    typeHeader: function (nextAction, callback) {
      this.headerMsg = '';
      const typingInterval = setInterval(() => {
        if (nextAction.length > 0) {
          // Add letter to header message one letter at a time
          this.headerMsg += nextAction[0];
          nextAction = nextAction.substring(1);
        } else {
          // Stop interval and call callback when finished
          clearInterval(typingInterval);
          callback();
        }
      }, 150);
    },
    // Deletion effect animation
    deleteHeader: function (callback) {
      const deleteInterval = setInterval(() => {
        if (this.headerMsg.length > 0) {
          // Remove header message one letter at a time
          this.headerMsg = this.headerMsg.substring(
            0,
            this.headerMsg.length - 1
          );
        } else {
          // Stop interval and call callback when finished
          clearInterval(deleteInterval);
          callback();
        }
      }, 75);
    },
  },
});
