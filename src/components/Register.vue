<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Register</h4>

      <input
        v-model="fullName"
        class="form-control mb-3"
        placeholder="Full Name"
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
        Đã có tài khoản?
        <router-link to="/login">Đăng nhập ngay !</router-link>
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

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// form data
const fullName = ref("");
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

// enable register button
const canRegister = computed(() => {
  return fullName.value && email.value && password.value && isEmailValid.value;
});

const openModal = (title, message) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// register function
const register = async () => {
  if (!isEmailValid.value) {
    openModal("Email không hợp lệ", "Email phải kết thúc bằng @gmail.com");
    return;
  }

  if (!fullName.value || !email.value || !password.value) {
    openModal("Thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
    return;
  }

  try {
    const response = await fetch("https://localhost:7181/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      openModal("Lỗi", error);
      return;
    }

    openModal("Thành công", "Tạo tài khoản thành công!");

    setTimeout(() => {
      closeModal();
      router.push("/login");
    }, 1500);
  } catch (error) {
    openModal("Server error", "Không kết nối được server");
  }
};

// auto redirect to login after success registration
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
</style>
