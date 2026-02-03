<template>
  <div class="container-fluid" id="main-container">
    <div class="row">
      <!-- LEFT -->
      <div class="col-sm-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="mb-4">Thông tin cá nhân</h4>

            <div class="text-center mb-3">
              <img
                :src="avatarPreview"
                class="rounded-circle mb-2"
                width="120"
                height="120"
              />
              <input
                type="file"
                class="form-control form-control-sm"
                @change="onAvatarChange"
              />
            </div>

            <form @submit.prevent>
              <div class="mb-3">
                <label class="form-label">Tên người dùng</label>
                <input class="form-control" v-model="form.username" />
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" v-model="form.email" />
              </div>

              <div class="mb-3">
                <label class="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="form.password"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="form.confirmPassword"
                />
              </div>

              <button class="btn btn-primary w-100" @click="saveChanges">
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="col-sm-8">
        <transition name="fade">
          <div class="card shadow-sm">
            <div class="card-body">
              <h4 class="mb-4 border-bottom pb-3" id="post-history-title">
                Bài viết đã đăng
              </h4>

              <!-- <div
                v-for="post in posts"
                :key="post.id"
                class="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-start"
              > -->
              <transition-group name="list" tag="div">
                <div
                  v-for="post in posts"
                  :key="post.id"
                  class="post-item border-bottom pb-3 mb-3 d-flex justify-content-between align-items-start"
                >
                  <div>
                    <h5>{{ post.title }}</h5>
                    <p class="text-muted mb-1">{{ post.excerpt }}</p>
                    <small>{{ post.date }} · {{ post.category }}</small>
                  </div>

                  <!-- ACTION BUTTONS -->
                  <div class="ms-3 text-nowrap">
                    <router-link
                      :to="`/posts/${post.id}`"
                      class="btn btn-sm btn-outline-primary me-2"
                    >
                      Xem
                    </router-link>

                    <router-link
                      :to="`/edit-post/${post.id}`"
                      class="btn btn-sm btn-outline-warning me-2"
                    >
                      Sửa
                    </router-link>

                    <!-- Delete button -->
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="openDeleteModal(post.id)"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <p v-if="posts.length === 0" class="text-muted">
                  Bạn chưa đăng bài viết nào.
                </p></transition-group
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div
    class="modal fade"
    :class="{ show: showDeleteModal }"
    tabindex="-1"
    style="display: block"
    v-if="showDeleteModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">Xác nhận xóa</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="closeDeleteModal"
          ></button>
        </div>

        <div class="modal-body">Bạn có chắc muốn xóa bài viết này không?</div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeDeleteModal">
            Hủy
          </button>
          <button class="btn btn-danger" @click="confirmDelete">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Backdrop -->
  <div class="modal-backdrop fade show" v-if="showDeleteModal"></div>
</template>

<script setup>
// import { ref, reactive } from "vue";

// import { onMounted } from "vue";

const user = JSON.parse(localStorage.getItem("user"));

// Avatar Upload Logic
const saveChanges = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  try {
    const res = await fetch(`https://localhost:7181/api/user/${user.userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fullName: form.username,
        email: form.email,
        password: form.password,
        avatarUrl: avatarPreview.value,
      }),
    });

    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);

    if (!res.ok) throw new Error(text);

    alert("Cập nhật thành công");
  } catch (err) {
    console.error("FULL ERROR:", err);
    alert("Cập nhật thất bại");
  }
};

// Delete Modal Logic
const showDeleteModal = ref(false);
const postToDelete = ref(null);

const openDeleteModal = (id) => {
  postToDelete.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  postToDelete.value = null;
};

const confirmDelete = async () => {
  if (!postToDelete.value) return;

  try {
    const res = await fetch(
      `https://localhost:7181/api/post/${postToDelete.value}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.ok) throw new Error("Delete failed");

    posts.value = posts.value.filter((p) => p.id !== postToDelete.value);

    closeDeleteModal();
  } catch (err) {
    alert("Xóa thất bại");
  }
};

// Load user info and posts on mount
import { ref, reactive, onMounted } from "vue";

const avatarPreview = ref("");
const posts = ref([]);

const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

onMounted(async () => {
  if (!user || !user.userID) return;

  try {
    // LOAD USER INFO
    const userRes = await fetch(
      `https://localhost:7181/api/auth/${user.userID}`,
    );

    if (!userRes.ok) throw new Error("User API lỗi");

    const userData = await userRes.json();

    form.username = userData.fullName;
    form.email = userData.email;
    avatarPreview.value = `https://localhost:7181${userData.avatarUrl}`;

    // LOAD POSTS
    const postRes = await fetch(
      `https://localhost:7181/api/post/by-user/${user.userID}`,
    );

    if (!postRes.ok) throw new Error("Post API lỗi");

    const postData = await postRes.json();

    posts.value = postData.map((p) => ({
      id: p.postID,
      title: p.title,
      excerpt:
        p.description?.length > 80
          ? p.description.slice(0, 80) + "..."
          : p.description,
      date: new Date(p.postDate).toLocaleDateString(),
      category: p.category,
    }));
  } catch (err) {
    console.error(err);
  }
});
</script>

<style scoped>
#main-container {
  margin-top: 80px;
}

#post-history-title {
  font-weight: bold;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.post-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 10px;
}

.post-item:hover {
  background-color: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
