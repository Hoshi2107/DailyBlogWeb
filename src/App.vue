<script setup>
import DailyBlogHomePage from "./components/DailyBlogHomePage.vue";
import router from "./router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";

const searchKeyword = ref("");

const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
};
</script>

<template>
  <!-- <Navbar /> -->
  <Navbar @search="handleSearch" />
  <router-view :searchKeyword="searchKeyword" />

  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!-- <div class="main-app"> -->
  <!-- <router-view></router-view> -->
  <!-- </div> -->
  <Footer />
</template>

<style scoped></style>
