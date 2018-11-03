<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Logo-Tinder.svg/572px-Logo-Tinder.svg.png" width="74" height="28">
          </router-link>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="techTinderNav" @click="toggleNavigation">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="techTinderNav" class="navbar-menu" :class="{ 'is-active' : showNavigation }" @click="toggleNavigation">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item" active-class="is-active" exact>Home</router-link>
            <router-link to="/vote" class="navbar-item" active-class="is-active">Vote</router-link>
            <router-link to="/suggest" class="navbar-item" active-class="is-active">Suggest</router-link>
            <router-link to="/stats" class="navbar-item" active-class="is-active">Stats</router-link>
            <router-link to="/about" class="navbar-item" active-class="is-active">About</router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavigation: false
    }
  },

  methods: {
    toggleNavigation: function() {
      this.showNavigation = !this.showNavigation
    }
  }
}
</script>
