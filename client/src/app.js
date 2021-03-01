// Initialization after window loads
window.onload = () => {
  // Change default submit action for search form
  document.querySelector('#searchForm').onsubmit = search;
};

// Submits a query to the API to get goodActions
function search(e) {
  e.preventDefault();

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
    if (e.target.status == 200) {
      let data = JSON.parse(e.target.response);
      formatResults(data);
    } else formatResults(null);
  };
  xhr.send();

  return false;
}

// Adds returned goodActions to the page
function formatResults(data) {
  // Clear any previous results
  let results = document.querySelector('#searchResults');
  results.innerHTML = '<hr />';

  // Check for no results
  if (data == null) {
    results.innerHTML = '<p>No Results Found :(</p>';
    return;
  }

  /* Format the data following:
   * <div>
   *   <h3></h3>
   *   <span></span>
   * </div>
   */
  for (let d of data) {
    const container = document.createElement('div');
    results.appendChild(container);

    const action = document.createElement('h3');
    action.textContent = d.action;
    container.appendChild(action);

    for (let t of d.tags) {
      const tag = document.createElement('span');
      tag.textContent = `#${t} `;
      container.appendChild(tag);
    }

    container.innerHTML += '<hr />';
  }
}
