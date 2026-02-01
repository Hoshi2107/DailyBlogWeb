<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Đăng nhập</h4>

      <input
        v-model="email"
        type="email"
        class="form-control mb-3"
        placeholder="Email"
      />

      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Mật khẩu"
      />

      <button class="btn btn-primary w-100 mb-2" @click="login">
        Đăng nhập
      </button>

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
            Thông báo ! ! !
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">Bạn cần đăng nhập để đăng bài viết ✍️</div>

        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Modal } from "bootstrap";
// import { login as loginApi } from "@/services/authService";
import { login as loginApi } from "../services/authService";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");

const login = async () => {
  if (!email.value || !password.value) {
    alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
    return;
  }

  try {
    const res = await loginApi({
      email: email.value,
      password: password.value,
    });

    // lưu user vào localStorage
    localStorage.setItem("user", JSON.stringify(res.data));

    router.push("/");
  } catch (err) {
    alert("Sai email hoặc mật khẩu.");
  }
};

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
