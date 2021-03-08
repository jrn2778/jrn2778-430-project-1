// Navbar component
const customNav = Vue.component('custom-nav', {
  template: `
    <nav class="navbar">
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

export { customNav };
