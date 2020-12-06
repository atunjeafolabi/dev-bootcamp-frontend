<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        ><i class="fas fa-laptop-code"></i> DevCamper</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-sign-in-alt"></i> Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">
              <i class="fas fa-user-plus"></i> Register
            </router-link>
          </li>
          <li class="nav-item d-none d-sm-block">
            <a class="nav-link" href="#">|</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'bootcamps' }">
              <i class="fas fa-user-plus"></i> Browse Bootcamps
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
