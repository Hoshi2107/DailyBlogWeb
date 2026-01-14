<template>
  <nav
    class="navbar navbar-expand-md navbar-light bg-primary bg-gradient fixed-top"
  >
    <div class="container-fluid px-4">
      <router-link class="navbar-brand fw-bold" to="/">
        <img :src="blogicon" alt="error" class="img" />
      </router-link>

      <div class="navbar-brand">Daily Blog</div>

      <!-- nav bar collapse when minimized -->
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
          <form class="d-flex me-3" @submit.prevent="handleSearch">
            <input
              v-model="keyword"
              class="form-control form-control-sm me-2"
              type="search"
              placeholder="Search books..."
              aria-label="Search"
            />
            <button class="btn btn-outline-light btn-sm" type="submit">
              Search
            </button>
          </form>
          <li class="nav-item">
            <router-link class="nav-link" to="/posts">My posts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-post">
              New post
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="btn btn-outline-light btn-sm" to="/login">
              Login
            </router-link>
          </li> -->

          <!-- Login -->
          <li class="nav-item" v-if="!user">
            <router-link class="btn btn-outline-light btn-sm" to="/login">
              Login
            </router-link>
          </li>

          <li class="nav-item dropdown" v-else>
            <a
              class="btn btn-outline-light btn-sm dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              {{ user.username }}
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/account">
                  Account
                </router-link>
              </li>
              <li>
                <button class="dropdown-item text-danger" @click="logout">
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import blogicon from "../imgs/blogicon.png";

//fake login
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const user = ref(null);

const loadUser = () => {
  const savedUser = localStorage.getItem("user");
  user.value = savedUser ? JSON.parse(savedUser) : null;
};

// load for the first time
loadUser();

// reload when route changes
watch(
  () => route.fullPath,
  () => {
    loadUser();
  }
);

const logout = () => {
  localStorage.removeItem("user");
  user.value = null;
  router.push("/login");
};

//search post
const keyword = ref("");

const handleSearch = () => {
  if (!keyword.value.trim()) return;

  router.push({
    path: "/home",
    query: { search: keyword.value },
  });
};
</script>

<style scoped>
.img {
  width: 70px;
  height: 70px;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.navbar-nav .nav-link {
  font-weight: bolder;
  font-size: 16px;
}

.navbar-nav .nav-link:hover {
  color: #f8f9fa;
  font-weight: bolder;
}

.navbar-nav {
  height: 50px;
}

.navbar-brand {
  color: #000000;
  font-size: 50px;
  font-weight: bolder;
  font-family: "Times New Roman", Times, serif;
}
</style>
