import * as util from './util.js';

// Initialization after window loads
window.onload = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/good-actions');
  xhr.onload = (e) => {
    if (e.target.status >= 200 && e.target.status < 300) {
      const data = JSON.parse(e.target.response);
      let unapproved = [];
      let approved = [];

      data.forEach((goodAction) => {
        if (goodAction.tags.some((t) => t.toLowerCase() == 'unapproved')) {
          unapproved.push(goodAction);
        } else approved.push(goodAction);
      });

      const unapprovedContainer = document.querySelector('#unapproved');
      unapproved.forEach((goodAction) => {
        formatGoodAction(unapprovedContainer, goodAction);
      });

      const approvedContainer = document.querySelector('#approved');
      approved.forEach((goodAction) => {
        formatGoodAction(approvedContainer, goodAction);
      });
    }
  };
  xhr.send();
};

function handleDelete(e, htmlElement) {
  if (e.target.status == 204) {
    alert('Deleted!');
    htmlElement.remove();
  }
}

function formatGoodAction(container, goodAction) {
  /* Format:
   * <div class="ga-card">
   *   <p class="ga-card-title"></p>
   *   <div class="ga-card-tags">
   *     <span class="ga-card-tag"></span>
   *   </div>
   *   <button>Remove</button>
   * </div>
   */

  // Create root card div
  const card = document.createElement('div');
  card.classList.add('ga-card');
  container.appendChild(card);

  // Create title
  const title = document.createElement('p');
  title.classList.add('ga-card-title');
  title.textContent = goodAction.action;
  card.appendChild(title);

  // Create tags container
  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('ga-card-tags');
  card.appendChild(tagsContainer);

  // Create individual tags
  goodAction.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.classList.add('ga-card-tag');
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Create buttons
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => util.deleteGoodAction(goodAction.id, handleDelete, card);
  card.appendChild(removeBtn);
}
