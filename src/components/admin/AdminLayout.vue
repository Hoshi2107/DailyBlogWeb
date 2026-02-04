<template>
  <div class="admin-container">
    <!-- LEFT SIDEBAR -->
    <div class="sidebar">
      <h5 class="text-white text-center py-3">Admin Panel</h5>

      <ul class="nav flex-column">
        <li class="nav-item" @click="activeTab = 'dashboard'">
          <a :class="navClass('dashboard')">Dashboard</a>
        </li>

        <li class="nav-item" @click="activeTab = 'users'">
          <a :class="navClass('users')">Quản lý tài khoản</a>
        </li>

        <li class="nav-item" @click="activeTab = 'posts'">
          <a :class="navClass('posts')">Quản lý bài viết</a>
        </li>

        <li class="nav-item" @click="activeTab = 'comments'">
          <a :class="navClass('comments')">Quản lý comment</a>
        </li>
      </ul>
    </div>

    <!-- RIGHT CONTENT -->
    <div class="content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import DashboardView from "./admin/DashboardView.vue";
import ManageUsers from "./admin/ManageUsers.vue";
import ManagePosts from "./admin/ManagePosts.vue";
import ManageComments from "./admin/ManageComments.vue";

const activeTab = ref("dashboard");

const currentComponent = computed(() => {
  switch (activeTab.value) {
    case "users":
      return ManageUsers;
    case "posts":
      return ManagePosts;
    case "comments":
      return ManageComments;
    default:
      return DashboardView;
  }
});

const navClass = (tab) => {
  return ["nav-link", activeTab.value === tab ? "active-link" : "text-white"];
};
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #1e293b;
  padding-top: 20px;
}

.nav-link {
  cursor: pointer;
  padding: 12px 20px;
  display: block;
  transition: 0.3s;
}

.nav-link:hover {
  background-color: #334155;
}

.active-link {
  background-color: #0d6efd;
  color: white !important;
}

.content {
  flex: 1;
  padding: 30px;
  background-color: #f8f9fa;
  overflow-y: auto;
}
</style>
