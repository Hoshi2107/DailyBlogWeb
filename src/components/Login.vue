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

  <!-- Modal for login required -->
  <div class="modal fade" id="loginRequiredModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="color: red; font-weight: bold">
            Notification ! ! !
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">You need to login for your post ✍️</div>

        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
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

// Show modal if redirected due to login requirement
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";

const route = useRoute();

onMounted(() => {
  if (route.query.reason === "needLogin") {
    const modalEl = document.getElementById("loginRequiredModal");
    const modal = new Modal(modalEl);
    modal.show();
  }
});
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
</style>
