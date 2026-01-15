<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Register</h4>

      <input
        v-model="username"
        class="form-control mb-3"
        placeholder="Username"
      />

      <input
        v-model="email"
        class="form-control mb-3"
        placeholder="Email (@gmail.com)"
      />

      <small v-if="email && !isEmailValid" class="text-danger">
        Email phải kết thúc bằng @gmail.com
      </small>

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

  <!-- Modal -->
  <div
    class="modal fade"
    tabindex="-1"
    :class="{ show: showModal }"
    style="display: block"
    v-if="showModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <p>{{ modalMessage }}</p>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">OK</button>
        </div>
      </div>
    </div>
  </div>

  <!-- backdrop -->
  <div class="modal-backdrop fade show" v-if="showModal"></div>
</template>

<!-- <script setup>
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
</script> -->

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");

// modal state
const showModal = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");

// check gmail realtime
const isEmailValid = computed(() => {
  return email.value.endsWith("@gmail.com");
});

const canRegister = computed(() => {
  return username.value && email.value && password.value && isEmailValid.value;
});

const openModal = (title, message) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const register = () => {
  if (!isEmailValid.value) {
    openModal("Email không hợp lệ", "Email phải kết thúc bằng @gmail.com");
    return;
  }

  if (!username.value || !password.value) {
    openModal("Thiếu thông tin", "Vui lòng nhập đầy đủ Username và Password");
    return;
  }

  const user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  localStorage.setItem("registeredUser", JSON.stringify(user));

  openModal("Notification", "Create account successfully ! ! !");

  setTimeout(() => {
    closeModal();
    router.push("/login");
  }, 1500);
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
</style>
