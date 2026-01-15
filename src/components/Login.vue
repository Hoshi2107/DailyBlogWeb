<!-- <template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Login</h4>

      <input
        v-model="username"
        type="text"
        class="form-control mb-3"
        placeholder="Username"
      />

      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Password"
      />

      <button class="btn btn-primary w-100" @click="login">Login</button>
    </div>
  </div>
</template> -->

<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Login</h4>

      <input
        v-model="username"
        type="text"
        class="form-control mb-3"
        placeholder="Username"
      />

      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Password"
      />

      <button class="btn btn-primary w-100 mb-2" @click="login">Login</button>

      <!-- Link to Register page -->
      <p class="text-center mb-0">
        Chưa có tài khoản?
        <router-link to="/register" class="text-decoration-none fw-semibold">
          Tạo tài khoản
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  if (!username.value || !password.value) {
    alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
    return;
  }

  // fake login
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: username.value,
    })
  );

  router.push("/");
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
</style>
