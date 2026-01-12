<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid px-4">
      <router-link class="navbar-brand fw-bold" to="/">
        📝 DailyBlog
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/posts">My posts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-post">
              New post
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-light btn-sm" to="/login">
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
<style scoped></style>
