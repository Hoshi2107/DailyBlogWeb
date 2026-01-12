<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
<!-- <template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
    <router-link to="/" class="navbar-brand"> Daily Blog </router-link>

    <div class="ms-auto">
      <router-link to="/Login" class="btn btn-outline-light me-2">
        Login
      </router-link>

      <router-link to="/create" class="btn btn-success"> Đăng bài </router-link>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {};
</script> -->
