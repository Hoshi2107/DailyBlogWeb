<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Quản lý tài khoản</h3>
      <!-- <button class="btn btn-primary btn-sm">+ Thêm user</button> -->
    </div>

    <div class="card">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th class="text-center">Thao tác</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span
                  class="badge"
                  :class="user.role === 'Admin' ? 'bg-danger' : 'bg-secondary'"
                >
                  {{ user.role }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm me-2"
                  :class="user.isActive ? 'btn-danger' : 'btn-success'"
                  @click="toggleUser(user)"
                >
                  {{ user.isActive ? "Vô hiệu hóa" : "Kích hoạt" }}
                </button>
              </td>
              <td>
                <span
                  class="badge"
                  :class="user.isActive ? 'bg-success' : 'bg-secondary'"
                >
                  {{ user.isActive ? "Hoạt động" : "Bị vô hiệu hóa" }}
                </span>
              </td>
            </tr>

            <tr v-if="users.length === 0">
              <td colspan="5" class="text-center py-3">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);

onMounted(async () => {
  const res = await axios.get("https://localhost:7181/api/admin/users");
  users.value = res.data;
});

// Function to toggle user activation status
import axios from "axios";

const toggleUser = async (user) => {
  if (user.isActive) {
    await axios.put(
      `https://localhost:7181/api/admin/deactivate/${user.userID}`,
    );
    user.isActive = false;
  } else {
    await axios.put(`https://localhost:7181/api/admin/activate/${user.userID}`);
    user.isActive = true;
  }
};
</script>
