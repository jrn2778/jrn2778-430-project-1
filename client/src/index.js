import * as util from './util.js';
import { customNav } from './vueComponents.js'

// Changes the home page's header goodAction on a fixed interval
function setHeaderGoodAction(interval) {
  util.getGoodAction((goodAction) => {
    if (goodAction != null) {
      home.headerMsg = goodAction.action;
    }
  });

  setTimeout(() => setHeaderGoodAction(interval), interval);
}

// Initialize the Vue instance
const home = new Vue({
  el: '#home',
  components: {
    customNav
  },
  data: function () {
    return {
      headerMsg: 'YOU can make the world a better place',
    };
  },
  mounted: function () {
    const HEADER_INTERVAL = 10000; // How often the header's goodAction changes in ms

    // Start the interval for changing the header's goodAction
    setHeaderGoodAction(HEADER_INTERVAL);
  },
});
