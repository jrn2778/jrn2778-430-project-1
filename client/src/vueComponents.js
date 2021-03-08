// Navbar component
const customNav = Vue.component('custom-nav', {
  template: `
    <nav class="navbar is-fixed-top">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">Better World</a>
  
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="mainNav"
          @click="toggleMobileNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
  
      <div id="mainNav" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <a href="/">Home</a>
          </div>
          <div class="navbar-item">
            <a href="/app">App</a>
          </div>
          <div class="navbar-item">
            <a href="/suggest">Suggest</a>
          </div>
          <div class="navbar-item">
            <a href="/admin">Admin</a>
          </div>
        </div>
      </div>
    </nav>`,
  methods: {
    toggleMobileNav: function () {
      document.querySelector('.navbar-burger').classList.toggle('is-active');
      document.querySelector('.navbar-menu').classList.toggle('is-active');
    },
  },
});

// Displays a good action as a card
const goodActionCard = Vue.component('good-action-card', {
  props: ['goodaction', 'approveclicked', 'removeclicked'],
  template: `
  <div class="column is-one-quarter-desktop is-half-tablet">
    <div class="card is-flex is-flex-direction-column is-justify-content-space-between">
      <div class="card-content has-text-centered">
        <p class="pb-3 has-text-weight-medium">{{ goodaction.action }}</p>
        <div class="is-flex is-justify-content-center is-flex-wrap-wrap">
          <span v-for="(tag, i) in goodaction.tags" :key="i" class="pl-1 pr-1">
            #{{ tag }}
          </span>
        </div>
      </div>
      <footer class="card-footer">
        <button 
          class="button is-success is-outlined card-footer-item"
          v-if="approveclicked"
          @click="approveclicked(goodaction)"
        >
          Approve
        </button>
        <button 
          class="button is-danger is-outlined card-footer-item"
          v-if="removeclicked"
          @click="removeclicked(goodaction)"
        >
          Remove
        </button>
      </footer>
    </div>
  </div>`,
});

export { customNav, goodActionCard };
