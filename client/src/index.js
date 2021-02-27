import * as util from './util.js';

// Initialization after window loads
window.onload = () => {
  const HEADER_INTERVAL = 10000; // How often the header's goodAction changes in ms

  // Start the interval for changing the header's goodAction
  setHeaderGoodAction(HEADER_INTERVAL);
};

// Changes the home page's header goodAction on a fixed interval
function setHeaderGoodAction(interval) {
  util.getGoodAction((goodAction) => {
    if (goodAction != null) {
      document.querySelector('#goodAction').textContent = goodAction.action;
    }
  });

  setTimeout(() => setHeaderGoodAction(interval), interval);
}
