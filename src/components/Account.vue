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

              <button class="btn btn-primary w-100">Lưu thay đổi</button>
            </form>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="col-sm-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="mb-4 border-bottom pb-3" id="post-history-title">
              Bài viết đã đăng
            </h4>

            <div
              v-for="post in posts"
              :key="post.id"
              class="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-start"
            >
              <div>
                <h5>{{ post.title }}</h5>
                <p class="text-muted mb-1">{{ post.excerpt }}</p>
                <small>{{ post.date }} · {{ post.status }}</small>
              </div>

              <!-- ACTION BUTTONS -->
              <div class="ms-3 text-nowrap">
                <router-link
                  :to="`/post-detail/${post.id}`"
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

                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deletePost(post.id)"
                >
                  Xóa
                </button>
              </div>
            </div>
            <p v-if="posts.length === 0" class="text-muted">
              Bạn chưa đăng bài viết nào.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const avatarPreview = ref("https://via.placeholder.com/120");

const form = reactive({
  username: "Nguyễn Văn A",
  email: "example@gmail.com",
  password: "",
  confirmPassword: "",
});

const posts = ref([
  {
    id: 1,
    title: "Ngày đầu học Vue.js",
    excerpt: "Hôm nay mình bắt đầu học Vue và cảm thấy khá là cuốn...",
    date: "10/01/2026",
    status: "Public",
  },
  {
    id: 2,
    title: "Cảm nghĩ về lập trình",
    excerpt: "Lập trình không khó, quan trọng là không bỏ cuộc...",
    date: "08/01/2026",
    status: "Private",
  },
]);

const onAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatarPreview.value = URL.createObjectURL(file);
  }
};

// fake delete post function
const deletePost = (id) => {
  if (!confirm("Bạn có chắc muốn xóa bài viết này không?")) return;

  posts.value = posts.value.filter((p) => p.id !== id);
};

// Here you would typically also make an API call to delete the post from the server
// await axios.delete(`/api/posts/${id}`);
</script>

<style scoped>
#main-container {
  margin-top: 80px;
}

#post-history-title {
  font-weight: bold;
}
</style>
