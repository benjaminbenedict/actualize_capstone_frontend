<template>
  <div id="app">
    <a class="menu-toggle rounded" href="#">
      <i class="fas fa-bars"></i>
    </a>
    <nav id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand">
          <a class="js-scroll-trigger" href="#page-top">Plant Track</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="/">Home</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="/signup">Signup</a>
        </li>
        <li v-if="!isLoggedIn()" class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="/login">Login</a>
        </li>
        <li v-if="isLoggedIn()" class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="/logout">Logout</a>
        </li>
        <li v-if="isLoggedIn()" class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="/userplants">Your Plants</a>
        </li>
      </ul>
    </nav>
    <div class="container"><router-view /></div>
    <footer class="footer text-center">
      <div class="container">
        <ul class="list-inline mb-5">
          <li class="list-inline-item">
            <a class="social-link rounded-circle text-white" href="https://github.com/benjaminbenedict">
              <i class="icon-social-github"></i>
            </a>
          </li>
        </ul>
        <p class="text-muted small mb-0">Copyright &copy; Plant Track 2021</p>
      </div>
    </footer>

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded js-scroll-trigger" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<style></style>
<script>
export default {
  data: function() {
    return {
      flashMessage: "",
    };
  },
  methods: {
    isLoggedIn: function() {
      return !!localStorage.getItem("jwt");
    },
  },
};
</script>
