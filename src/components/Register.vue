<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Register</h4>

      <input
        v-model="username"
        class="form-control mb-3"
        placeholder="Username"
      />

      <input v-model="email" class="form-control mb-3" placeholder="Email" />

      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Password"
      />

      <button class="btn btn-success w-100" @click="register">
        Tạo tài khoản
      </button>

      <p class="text-center mt-2 mb-0">
        Have an account?
        <router-link to="/login">Login now</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");

const register = () => {
  if (!username.value || !email.value || !password.value) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  // fake register process
  const user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  localStorage.setItem("registeredUser", JSON.stringify(user));

  alert("Tạo tài khoản thành công!");
  router.push("/login");
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
</style>
