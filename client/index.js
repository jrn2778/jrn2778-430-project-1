// Initialization after window loads
window.onload = () => {
  const HEADER_INTERVAL = 10000; // How often the header's goodAction changes in ms

  setHeaderGoodAction(HEADER_INTERVAL); // Start the interval for changing the header's goodAction
};

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

function setHeaderGoodAction(interval) {
  getGoodAction((goodAction) => {
    if (goodAction != null) {
      document.querySelector('#goodAction').textContent = goodAction.action;
    }
  });

  setTimeout(() => setHeaderGoodAction(interval), interval);
}
